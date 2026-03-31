import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getPromptForVraag, correctQuizVragen, OpdrachtPromptInput } from '@/lib/opdracht-prompts/module-1';
import { getPromptForVraag as getPromptForVraagModule4, correctQuizVragen as correctQuizVragenModule4 } from '@/lib/opdracht-prompts/module-4';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const claudeApiKey = process.env.ANTHROPIC_API_KEY;

// AI Correction via Claude/Anthropic
async function correctWithClaude(prompt: string): Promise<any> {
  if (!claudeApiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt + '\n\nGeef ALLEEN de JSON output, geen andere tekst.',
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in Claude response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Claude error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_email,
      module_slug,
      les_slug,
      opdracht_type,
      antwoorden,
    } = body;

    console.log('[Corrigeren] Request ontvangen:', { user_email, module_slug, les_slug, opdracht_type });

    if (!user_email || !module_slug || !les_slug || !opdracht_type || !antwoorden) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // AI Correctie proberen
    let score: number | undefined;
    let feedback: string | undefined;
    let details: any = undefined;
    let aiError: string | undefined;

    if (opdracht_type === 'tekst') {
      try {
        // Bereken gewogen score voor open vragen
        const openVragen = antwoorden;
        const detailsArray = [];
        let totaalScore = 0;
        let totaalGewicht = 0;

        for (const [vraagId, antwoord] of Object.entries(openVragen)) {
          const promptInput: OpdrachtPromptInput = {
            moduleSlug: module_slug,
            lesSlug: les_slug,
            openVragen: [],
            quizVragen: [],
            antwoorden,
          };

          // Voeg de specifieke antwoord toe
          const vraagInput = { ...promptInput, antwoord: antwoord as string };
          let prompt;
          if (module_slug === 'module-4') {
            prompt = getPromptForVraagModule4(vraagId, vraagInput);
          } else {
            prompt = getPromptForVraag(vraagId, vraagInput);
          }

          const result = await correctWithClaude(prompt);

          // Gebruik de score van de AI
          let vraagScore = result.score;
          let vraagGewicht = 0;

          // Bepaal gewicht op basis van vraag en module
          if (module_slug === 'module-4') {
            if (vraagId === 'study-buddy-oefening') {
              vraagGewicht = 70;
            } else if (vraagId === 'schrijfoefening') {
              vraagGewicht = 40;
            } else if (vraagId === 'spelregels-oefening') {
              vraagGewicht = 50;
            } else if (vraagId === 'reflectieverslag') {
              vraagGewicht = 40;
            }
          } else {
            if (vraagId === 'ai-dagboek') {
              vraagGewicht = 30;
            } else if (vraagId === 'ai-analyse') {
              vraagGewicht = 40;
            } else if (vraagId === 'discussie') {
              vraagGewicht = 10;
            }
          }

          if (vraagGewicht > 0) {
            totaalScore += (vraagScore * vraagGewicht) / 100;
            totaalGewicht += vraagGewicht;
          }

          detailsArray.push({
            id: vraagId,
            titel: `${vraagId.charAt(0).toUpperCase() + vraagId.slice(1).replace('-', ' ')}`,
            score: vraagScore,
            feedback: result.details?.[0]?.feedback || result.feedback || 'Geen feedback',
          });
        }

        score = Math.round(totaalGewicht > 0 ? totaalScore / totaalGewicht : 0);
        feedback = 'Je antwoorden zijn beoordeeld door AI.';
        details = detailsArray;

        console.log('[Corrigeren] AI correctie voltooid, score:', score);

      } catch (error) {
        console.error('[Corrigeren] AI correctie error:', error);
        aiError = error instanceof Error ? error.message : 'Unknown error';
        // Zet score op standaard zonder AI
        score = 0;
        feedback = 'AI correctie tijdelijk niet beschikbaar. Je antwoorden zijn opgeslagen.';
      }
    } else if (opdracht_type === 'quiz') {
      // Directe correctie voor quiz
      let quizResult;
      if (module_slug === 'module-4') {
        quizResult = correctQuizVragenModule4({
          moduleSlug: module_slug,
          lesSlug: les_slug,
          openVragen: [],
          quizVragen: [],
          antwoorden,
        });
      } else {
        quizResult = correctQuizVragen({
          moduleSlug: module_slug,
          lesSlug: les_slug,
          openVragen: [],
          quizVragen: [],
          antwoorden,
        });
      }

      score = quizResult.score;
      feedback = quizResult.feedback;
      details = quizResult.details;

      console.log('[Corrigeren] Quiz correctie voltooid, score:', score);
    }

    // Sla resultaat op in Supabase
    console.log('[Corrigeren] Opslaan in Supabase...');

    // Check of er al een voortgang bestaat
    const { data: existing, error: selectError } = await supabase
      .from('opdracht_voortgang')
      .select('id')
      .eq('user_email', user_email)
      .eq('module_slug', module_slug)
      .eq('les_slug', les_slug)
      .eq('opdracht_type', opdracht_type)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('[Corrigeren] Select error:', selectError);
    }

    const voortgangData = {
      antwoorden,
      score: score,
      feedback: feedback || null,
      status: 'gecorrigeerd',
      updated_at: new Date().toISOString(),
      correctie_data: details || null,
    };

    let saveError;
    if (existing) {
      // Update bestaande
      const result = await supabase
        .from('opdracht_voortgang')
        .update(voortgangData)
        .eq('id', existing.id);
      saveError = result.error;
      console.log('[Corrigeren] Update result:', saveError ? 'ERROR' : 'OK');
    } else {
      // Maak nieuwe
      const result = await supabase
        .from('opdracht_voortgang')
        .insert({
          user_email,
          module_slug,
          les_slug,
          opdracht_type,
          ...voortgangData,
        });
      saveError = result.error;
      console.log('[Corrigeren] Insert result:', saveError ? 'ERROR' : 'OK', saveError);
    }

    if (saveError) {
      console.error('[Corrigeren] Save error:', saveError);
      return NextResponse.json(
        { error: `Database error: ${saveError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      score: score,
      feedback: feedback || aiError || 'Opgeslagen zonder AI correctie',
      details,
    });

  } catch (error) {
    console.error('[Corrigeren] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}