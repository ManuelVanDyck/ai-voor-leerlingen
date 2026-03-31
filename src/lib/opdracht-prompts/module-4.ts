// AI Correctie prompts voor Module 4
// Opdrachten: Study Buddy, Schrijfoefening, Spelregels, Reflectieverslag

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
export const promptStudyBuddy = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['study-buddy-oefening'] || '';

  return `
Je beoordeelt een study buddy oefening van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Study Buddy Oefening**
Kies een vak, stel AI vraag, maak screenshot prompt + antwoord, beschrijf wat je laat zien en hebt geleerd.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Toepassing (70%)**: Effectieve en correcte manier van AI-gebruik voor studeren
- **Reflectie (30%)**: Nadenken over wat is geleerd en waarom het nuttig is

**INSTRUCTIES:**
1. Beoordeel de toepassing:
   - Heeft de leerling een specifiek vak en onderwerp gekozen?
   - Is de vraag duidelijk en doelgericht?
   - Heeft de leerling screenshots gemaakt (beschreven)?
   - Laat de oefening effectief studeren zien?

2. Beoordeel de reflectie:
   - Toont de leerlijk na over waarom AI nuttig is?
   - Geeft aan wat hij/zij heeft geleerd?
   - Is de reflectie persoonlijk en zinvol?

3. Geef gedetailleerde feedback per criterium met concrete suggesties voor verbetering

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands over de study buddy oefening",
  "details": [
    {
      "id": "toepassing",
      "titel": "Toepassing",
      "score": score (0-100),
      "feedback": "specifieke feedback over hoe AI effectief gebruikt is voor studeren"
    },
    {
      "id": "reflectie",
      "titel": "Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de reflectie op wat is geleerd"
    }
  ]
}
`;
};

export const promptSchrijfoefening = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['schrijfoefening'] || '';

  return `
Je beoordeelt een schrijfopdracht oefening van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Schrijfopdracht Oefening**
Schrijf 10 zinnen, vraag AI feedback, pas aan, beschrijf veranderingen.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Schrijfkwaliteit (40%)**: Kwaliteit van de uiteindelijke tekst
- **Reflectie (30%)**: Nadenken over veranderingen gemaakt
- **Verbetering (30%)**: Hoe de tekst verbeterd is op basis van AI-feedback

**INSTRUCTIES:**
1. Beoordeel de schrijfkwaliteit:
   - Is de tekst duidelijk en grammaticaal correct?
   - Heeft de tekst een logische opbouw?
   - Is de taal passend voor de doelgroep?
   - Bevat de tekst variatie in zinnen en woordgebruik?

2. Beoordeel de reflectie:
   - Geeft de leerlijk duidelijk aan wat is veranderd?
   - Legt de leerlijk uit waarom bepaalde keuzes zijn gemaakt?
   - Toont inzicht in de waarde van AI-feedback?

3. Beoordeel de verbetering:
   - Is de tekst daadwerkelijk verbeterd na feedback?
   - Zijn de suggesties van AI opgevolgd op een slimme manier?
   - Is de leerlijk kritisch geweest bij het implementeren van feedback?

4. Geef gedetailleerde feedback per criterium met concrete voorbeelden

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands over de schrijfopdracht",
  "details": [
    {
      "id": "schrijfkwaliteit",
      "titel": "Schrijfkwaliteit",
      "score": score (0-100),
      "feedback": "specifieke feedback over de kwaliteit van de geschreven tekst"
    },
    {
      "id": "reflectie",
      "titel": "Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de reflectie op veranderingen"
    },
    {
      "id": "verbetering",
      "titel": "Verbetering",
      "score": score (0-100),
      "feedback": "specifieke feedback over hoe de tekst verbeterd is"
    }
  ]
}
`;
};

export const promptSpelregels = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['spelregels-oefening'] || '';

  return `
Je beoordeelt een spelregels oefening van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Spelregels Oefening**
Bespreek 3 vragen met klasgenoot, schrijf 5 regels voor AI-gebruik op school.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Inzicht (50%)**: Diepgang van inzichten over AI-gebruik
- **Regelgeving (50%)**: Kwaliteit en duidelijkheid van de voorgestelde regels

**INSTRUCTIES:**
1. Beoordeel het inzicht:
   - Toont de leerlijk echt nadenken over AI in de schoolcontext?
   - Deelt de leerlijk originele inzichten?
   - Begrijpt de leerlijk de nuances eerlijk AI-gebruik?
   - Maakt de leerlijk connecties met eerder geleerde concepten?

2. Beoordeel de regelgeving:
   - Zijn de regels duidelijk en concreet?
   - Bedekken de regels belangrijke aspecten van AI-gebruik (transparantie, eerlijkheid, etc.)?
   - Zijn de regels haalbaar en realistisch voor de schoolcontext?
   - Zijn de regels gestructureerd en logisch opgezet?

3. Geef gedetailleerde feedback per criterium met concrete suggesties voor verdere verfijning

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands over de spelregels oefening",
  "details": [
    {
      "id": "inzicht",
      "titel": "Inzicht",
      "score": score (0-100),
      "feedback": "specifieke feedback over de diepgang van inzichten"
    },
    {
      "id": "regelgeving",
      "titel": "Regelgeving",
      "score": score (0-100),
      "feedback": "specifieke feedback over de kwaliteit van de voorgestelde regels"
    }
  ]
}
`;
};

export const promptReflectieverslag = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['reflectieverslag'] || '';

  return `
Je beoordeelt een reflectieverslag van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Reflectieverslag**
150-200 woorden reflectie over hele cursus (wat geleerd, toekomstige toepassing, belangrijkste les)

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Diepgang (40%)**: Diepgang van reflectie op geleerde concepten
- **Toepassing (30%)**: Hoe AI in de toekomst zal worden gebruikt
- **Reflectie (30%)**: Reflectie op het belangrijkste geleerde

**INSTRUCTIES:**
1. Beoordeel de diepgang:
   - Toont de leerlijk echt begrip van AI-concepten?
   - Maakt de leerlijke connecties tussen verschillende modules?
   - Toont de leerlijk kritisch nadenken over AI?
   - Is de reflectie meer dan oppervlakkige samenvattingen?

2. Beoordeel de toepassing:
   - Geeft de leerlijk realistische en nuttige toepassingen voor de toekomst?
   - Toont de leerlijk inzicht in voorzichtigheid bij AI-gebruik?
   - Is het concreet en niet algemeen?

3. Beoordeel de reflectie:
   - Heeft de leerlijk duidelijk geïdentificeerd wat het belangrijkste is?
   - Toont de leerlijk persoonlijke groei tijdens de cursus?
   - Is de reflectie authentiek en betekenisvol?

4. Controleer de woordentelling (150-200 woorden)

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands over het reflectieverslag",
  "details": [
    {
      "id": "diepgang",
      "titel": "Diepgang",
      "score": score (0-100),
      "feedback": "specifieke feedback over de diepgang van reflectie"
    },
    {
      "id": "toepassing",
      "titel": "Toepassing",
      "score": score (0-100),
      "feedback": "specifieke feedback over toekomstige toepassing van AI"
    },
    {
      "id": "reflectie",
      "titel": "Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over reflectie op belangrijkste les"
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
  // Correct antwoorden voor de quiz (per les verschillend)
  const correctAntwoorden: Record<string, Record<string, string>> = {
    'les-1': {
      'q1': 'B',
      'q2': 'B',
      'q3': 'B',
      'q4': 'B'
    },
    'les-2': {
      'q1': 'B',
      'q2': 'B',
      'q3': 'C',
      'q4': 'B'
    },
    'les-3': {
      'q1': 'B',
      'q2': 'B',
      'q3': 'B',
      'q4': 'B'
    },
    'les-4': {
      'q1': 'B',
      'q2': 'B',
      'q3': 'B',
      'q4': 'B',
      'q5': 'A',
      'q6': 'B',
      'q7': 'B',
      'q8': 'B',
      'q9': 'B',
      'q10': 'B'
    }
  };

  const currentLes = input.lesSlug;
  const correct = correctAntwoorden[currentLes] || {};

  const details = [];
  let totaalScore = 0;
  let aantalVragen = 0;

  // Check elke vraag
  for (const [vraagId, antwoord] of Object.entries(input.antwoorden)) {
    if (vraagId.startsWith('q')) {
      const correctAntwoord = correct[vraagId];
      if (correctAntwoord) {
        const isCorrect = antwoord === correctAntwoord;
        const score = isCorrect ? 100 : 0;
        totaalScore += score;
        aantalVragen++;

        details.push({
          id: vraagId,
          titel: `Vraag ${vraagId.replace('q', '')}`,
          score: score,
          feedback: isCorrect ? '✅ Correct!' : `❌ Fout. Het juiste antwoord is: ${correctAntwoord}`
        });
      }
    }
  }

  const percentageScore = aantalVragen > 0 ? Math.round((totaalScore / (aantalVragen * 100)) * 100) : 0;

  return {
    score: percentageScore,
    feedback: `Je scoorde ${percentageScore}%. ${aantalVragen} van de ${aantalVragen} vragen correct behaald.`,
    details
  };
};

// Helper functie om de juiste prompt te selecteren
export const getPromptForVraag = (vraagId: string, input: OpdrachtPromptInput): string => {
  switch (vraagId) {
    case 'study-buddy-oefening':
      return promptStudyBuddy(input);
    case 'schrijfoefening':
      return promptSchrijfoefening(input);
    case 'spelregels-oefening':
      return promptSpelregels(input);
    case 'reflectieverslag':
      return promptReflectieverslag(input);
    default:
      throw new Error(`Onbekende vraag ID: ${vraagId}`);
  }
};