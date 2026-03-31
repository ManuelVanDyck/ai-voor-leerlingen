// AI Correctie prompts voor Module 1 Les 3
// Opdracht: AI in mijn leven

export interface MultipleChoiceOptie {
  label: string;
  waarde: string;
  correct?: boolean;
}

export interface OpdrachtVraag {
  id: string;
  vraag: string;
  type: 'tekst' | 'quiz';
  criteria?: Criterium[];
  opties?: MultipleChoiceOptie[];
  correctAntwoord?: string;
}

export interface Criterium {
  naam: string;
  gewicht: number;
  beschrijving: string;
}

export interface OpdrachtPromptInput {
  moduleSlug: string;
  lesSlug: string;
  openVragen: OpdrachtVraag[];
  quizVragen: OpdrachtVraag[];
  antwoorden: Record<string, any>;
}

export interface OpdrachtPromptOutput {
  score: number;
  feedback: string;
  details: {
    id: string;
    titel: string;
    score: number;
    feedback: string;
  }[];
}

// Open vragen prompts
export const promptAI_Dagboek = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['ai-dagboek'] || '';

  return `
Je beoordeelt een AI-dagboek van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: AI Dagboek**
Houd gedurende 24 uur bij wanneer je AI tegenkomt. Probeer minstens 10 voorbeelden te vinden!

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIUM: Volledigheid (30%)**
- De leerling heeft minstens 10 AI-voorbeelden geïdentificeerd
- De voorbeelden zijn specifiek en duidelijk
- Er is beschreven wat de AI doet in elke situatie

**INSTRUCTIES:**
1. Tel het aantal voorbeelden in de antwoord
2. Als er minder dan 10 zijn: score 0
3. Als er 10+ zijn: beoordeel de specificiteit en kwaliteit van elk voorbeeld
4. Geef een feedbackbericht in het Nederlands dat:
   - Benoemt hoeveel voorbeelden er zijn
   - Geeft aan of deze voldoen aan de eis
   - Bevat suggesties voor verbetering (als nodig)

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": score (0-100),
  "feedback": "feedback in het Nederlands",
  "details": [
    {
      "id": "ai-dagboek",
      "titel": "AI Dagboek",
      "score": score (0-100),
      "feedback": "specifieke feedback per voorbeeld"
    }
  ]
}
`;
};

export const promptAI_Analyse = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['ai-analyse'] || '';

  return `
Je beoordeelt een AI-analyse van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: AI Analyse**
Kies één app en analyseer: welke AI-types, welke data, hoe zonder AI, voordelen, nadelen. Schrijf ~200 woorden.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Diepgang (40%)**: Analyse is grondig en gedetailleerd, gaat dieper dan oppervlakkige beschrijvingen
- **Schrijfstijl (20%)**: Duidelijk, gestructureerd, aangepast aan de doelgroep

**INSTRUCTIES:**
1. Beoordeel de diepgang:
   - Geeft de leerling specifieke AI-types aan?
   - Begrijpt welke data de AI gebruikt?
   - Analyseert de voordelen en nadelen kritisch?
   - Geeft inzicht in hoe de app zonder AI zou werken?

2. Beoordeel de schrijfstijl:
   - Is de tekst gestructureerd en makkelijk te begrijpen?
   - Is de taal passend voor 14-15 jarigen?
   - Is het ongeveer 200 woorden?

3. Geef gedetailleerde feedback per criterium met concrete voorbeelden

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands",
  "details": [
    {
      "id": "diepgang",
      "titel": "Diepgang",
      "score": score (0-100),
      "feedback": "specifieke feedback over de analyse diepgang"
    },
    {
      "id": "schrijfstijl",
      "titel": "Schrijfstijl",
      "score": score (0-100),
      "feedback": "specifieke feedback over de schrijfstijl"
    }
  ]
}
`;
};

export const promptDiscussie = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['discussie'] || '';

  return `
Je beoordeelt een discussieverslag van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Discussie**
Bespreek in groepjes: welke app zou je missen, welke AI slimst/minst slim, AI-gebruik

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIUM: Reflectie (10%)**
- De leerling toont nadenken over AI in het dagelijks leven
- Deelt persoonlijke inzichten uit de groepsdiscussie
- Maakt connecties met eerder geleerde concepten

**INSTRUCTIES:**
1. Beoordeel de mate van reflectie:
   - Toont de leerling echt na over AI?
   - Deelt originele inzichten?
   - Verbindt de discussie met eigen ervaringen?

2. Geef feedback die:
   - De reflectie bevestigt verbetert
   - Aangeeft wat de leerling goed doet
   - Geeft suggesties voor verdere diepgang

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": score (0-100),
  "feedback": "feedback over de mate van reflectie",
  "details": [
    {
      "id": "reflectie",
      "titel": "Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de reflectie"
    }
  ]
}
`;
};

// Quiz vragen correctie
export const correctQuizVragen = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): {
  score: number;
  feedback: string;
  details: { id: string; titel: string; score: number; feedback: string }[];
} => {
  // Correct antwoorden voor de quiz
  const correctAntwoorden: Record<string, string> = {
    'q1': 'B',
    'q2': 'C',
    'q3': 'B',
    'q4': 'B',
    'q5': 'B',
    'q6': 'A',
    'q7': 'B',
    'q8': 'B',
    'q9': 'A',
    'q10': 'B'
  };

  const details = [];
  let totaalScore = 0;

  // Check elke vraag
  for (const [vraagId, antwoord] of Object.entries(input.antwoorden)) {
    const correct = correctAntwoorden[vraagId];
    const isCorrect = antwoord === correct;
    const score = isCorrect ? 100 : 0;
    totaalScore += score;

    details.push({
      id: vraagId,
      titel: `Vraag ${vraagId.replace('q', '')}`,
      score: score,
      feedback: isCorrect ? '✅ Correct!' : `❌ Fout. Het juiste antwoord is: ${correct}`
    });
  }

  const percentageScore = Math.round((totaalScore / (Object.keys(input.antwoorden).length * 100)) * 100);

  return {
    score: percentageScore,
    feedback: `Je scoorde ${percentageScore}%. ${Object.keys(input.antwoorden).length * 4} van de 40 punten behaald (${Object.values(input.antwoorden).filter((a, i) => a === correctAntwoorden[`q${i + 1}`]).length}/${Object.keys(input.antwoorden).length} vragen correct).`,
    details
  };
};

// Helper functie om de juiste prompt te selecteren
export const getPromptForVraag = (vraagId: string, input: OpdrachtPromptInput): string => {
  switch (vraagId) {
    case 'ai-dagboek':
      return promptAI_Dagboek(input);
    case 'ai-analyse':
      return promptAI_Analyse(input);
    case 'discussie':
      return promptDiscussie(input);
    default:
      throw new Error(`Onbekende vraag ID: ${vraagId}`);
  }
};