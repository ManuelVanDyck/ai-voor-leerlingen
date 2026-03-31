'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, Send, RotateCcw, Trophy, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface MultipleChoiceOptie {
  label: string;
  waarde: string;
  correct?: boolean;
}

interface OpdrachtVraag {
  id: string;
  vraag: string;
  type: 'tekst' | 'quiz';
  criteria?: any[];
  opties?: MultipleChoiceOptie[];
  correctAntwoord?: string;
}

interface OpdrachtConfig {
  moduleSlug: string;
  lesSlug: string;
  openVragen: OpdrachtVraag[];
  quizVragen: OpdrachtVraag[];
}

interface OpdrachtComponentProps {
  moduleSlug: string;
  lesSlug: string;
  opdrachten: OpdrachtConfig;
}

interface AntwoordData {
  [key: string]: string;
}

interface CorrectieResult {
  score?: number;
  feedback?: string;
  details?: Array<{
    id: string;
    titel: string;
    score: number;
    feedback: string;
  }>;
  status: string;
}

interface VoortgangData {
  antwoorden: AntwoordData;
  score: number;
  feedback: string;
  status: string;
  correctie_data?: any;
}

const PASSING_SCORE = 50;

export default function OpdrachtComponent({
  moduleSlug,
  lesSlug,
  opdrachten,
}: OpdrachtComponentProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectieResult | null>(null);
  const [previousResult, setPreviousResult] = useState<VoortgangData | null>(null);
  const [savedDraft, setSavedDraft] = useState(false);

  // Initialize antwoorden - only for open questions (tekst type)
  const initialAntwoorden: AntwoordData = {};
  opdrachten.openVragen.forEach((vraag) => {
    initialAntwoorden[vraag.id] = '';
  });

  const [antwoorden, setAntwoorden] = useState<AntwoordData>(initialAntwoorden);

  // Check for previous result on mount
  useEffect(() => {
    const checkPreviousResult = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/opdracht/voortgang/ophalen?user_email=${encodeURIComponent(session.user.email)}&module_slug=${moduleSlug}&les_slug=${lesSlug}&opdracht_type=tekst`,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setPreviousResult(data.data);
            setResult({
              score: data.data.score,
              feedback: data.data.feedback,
              details: data.data.correctie_data?.details || [],
              status: 'gecorrigeerd',
            });
            // Voudig antwoorden naar vorige resultaten
            setAntwoorden(data.data.antwoorden);
          }
        }
      } catch (error) {
        console.error('Error fetching previous result:', error);
      }
    };

    checkPreviousResult();
  }, [session?.user?.email, moduleSlug, lesSlug]);

  const handleAntwoordChange = (vraagId: string, value: string) => {
    setAntwoorden(prev => ({ ...prev, [vraagId]: value }));
    setSavedDraft(false);
  };

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      alert('Je moet ingelogd zijn om in te dienen.');
      return;
    }

    const incomplete = Object.values(antwoorden).some(answer => !answer || answer.trim() === '');
    if (incomplete) {
      alert('Vul eerst alle vragen in voordat je indient.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/opdracht/corrigeer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: session.user.email,
          module_slug: moduleSlug,
          les_slug: lesSlug,
          opdracht_type: 'tekst',
          antwoorden,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          score: data.score,
          feedback: data.feedback,
          details: data.details,
          status: 'gecorrigeerd',
        });
        setPreviousResult({
          antwoorden,
          score: data.score,
          feedback: data.feedback,
          status: 'gecorrigeerd',
          correctie_data: data.details,
        });
      } else {
        throw new Error(data.error || 'Er ging iets mis');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Er ging iets mis bij het indienen. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    // Reset only open questions
    const resetAntwoorden: AntwoordData = {};
    opdrachten.openVragen.forEach((vraag) => {
      resetAntwoorden[vraag.id] = '';
    });
    setAntwoorden(resetAntwoorden);
    setPreviousResult(null);
  };

  const isPassed = result?.score !== undefined && result.score >= PASSING_SCORE;

  // Berekent score voor open vragen
  const calculateOpenQuestionsScore = () => {
    if (!result?.details || !result.details.length) return 0;

    const openDetails = result.details.filter(detail => !detail.id.startsWith('q'));
    let totaalScore = 0;
    let totaalGewicht = 0;

    openDetails.forEach(detail => {
      if (detail.id === 'ai-dagboek') {
        totaalScore += detail.score * 0.3;
        totaalGewicht += 0.3;
      } else if (detail.id === 'ai-analyse') {
        totaalScore += detail.score * 0.4;
        totaalGewicht += 0.4;
      } else if (detail.id === 'discussie') {
        totaalScore += detail.score * 0.1;
        totaalGewicht += 0.1;
      }
    });

    return totaalGewicht > 0 ? Math.round(totaalScore / totaalGewicht) : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-brand-red" />
        <h3 className="text-xl font-bold text-gray-800">Interactieve Opdrachten</h3>
        {result === null && previousResult && (
          <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Eerder ingediend
          </span>
        )}
      </div>

      {result === null ? (
        <>
          {/* Open vragen only */}
          {opdrachten.openVragen.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📝 Open Vragen (Oefeningen)
              </h4>
              <div className="space-y-6">
                {opdrachten.openVragen.map((vraag, index) => (
                  <div key={vraag.id} className="border border-gray-200 rounded-lg p-4">
                    <label className="block font-medium text-gray-800 mb-3">
                      <span className="text-brand-red font-semibold">{index + 1}.</span> {vraag.vraag}
                    </label>
                    <textarea
                      value={antwoorden[vraag.id] || ''}
                      onChange={(e) => handleAntwoordChange(vraag.id, e.target.value)}
                      placeholder="Schrijf je antwoord hier..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent resize-y min-h-[120px]"
                      rows={5}
                      disabled={loading}
                    />
                    {previousResult?.antwoorden[vraag.id] && (
                      <div className="mt-2 text-xs text-gray-500">
                        Je vorige antwoord is bewaard.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Indienen knop */}
          {opdrachten.openVragen.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Indienen...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Indienen voor correctie
                </>
              )}
            </button>
          )}
        </>
      ) : (
        /* Resultaat */
        <div className="space-y-6">
          {/* Score display */}
          <div className="bg-gradient-to-r from-brand-red/10 to-brand-green/10 rounded-lg p-6 text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xl font-bold ${
              isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isPassed ? <Trophy className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              Score: {result.score}/100
              {isPassed ? ' - Geslaagd! 🎉' : ' - Niet geslaagd'}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Score: {calculateOpenQuestionsScore()}/100
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-green" />
              Feedback
            </h4>
            <p className="text-gray-700">{result.feedback}</p>
          </div>

          {/* Details per vraag */}
          {result.details && result.details.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Details per vraag</h4>
              <div className="space-y-4">
                {result.details.map((detail, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{detail.titel}</span>
                      <span className={`font-bold ${
                        detail.score >= 80 ? 'text-green-600' :
                        detail.score >= 60 ? 'text-yellow-600' :
                        detail.score >= 40 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {detail.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{detail.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actie knoppen */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isPassed ? (
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Opnieuw proberen
              </button>
            ) : null}

            <button
              onClick={handleRetry}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Opnieuw oefenen
            </button>
          </div>

          {/* Info bij niet geslaagd */}
          {!isPassed && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Herkansing:</strong> Je moet minimaal {PASSING_SCORE}% halen. Verbeter je antwoorden en dien opnieuw in.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}