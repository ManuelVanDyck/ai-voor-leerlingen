// AI Correctie prompts voor Module 2
// Opdrachten: ChatGPT/Gemini ervaring, Prompt verbetering, AI Kunst Galerij, AI Project

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
export const promptEersteDate = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['eerste-date'] || '';

  return `
Je beoordeelt een reflectie over een eerste ervaring met ChatGPT/Gemini van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Eerste date met AI**
Reflectie op ervaringen met ChatGPT/Gemini over leukst, verrassend, tegenvallend, gevoel, volgende keer.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIUM: Reflectie (100%)**
- De leerling toont diepe reflectie op de ervaring
- Beschrijft specifieke voor- en nadelen van AI-gesprekken
- Toont emotionele intelligentie in de beschrijving
- Maakt connecties met verwachtingen en realiteit
- Geeft inzicht in leerproces en volgende stappen

**INSTRUCTIES:**
1. Beoordeel de mate van reflectie:
   - Geeft de leerling concrete voorbeelden van het gesprek?
   - Analyseert de leerling wat wel/niet werkte?
   - Toont begrip van de sterke/zwakke punten van AI?
   - Heeft de leerling geleerd van de ervaring?

2. Geef feedback die:
   - De reflectie bevestigt of verbetert
   - Aangeeft wat de leerling goed doet
   - Geeft suggesties voor verdere diepgang
   - Moedigt aan om door te experimenteren

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": score (0-100),
  "feedback": "feedback over de reflectie in het Nederlands",
  "details": [
    {
      "id": "reflectie",
      "titel": "Reflectie op AI-ervaring",
      "score": score (0-100),
      "feedback": "specifieke feedback over de diepgang van reflectie"
    }
  ]
}
`;
};

export const promptPromptChallenge = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['prompt-verbeter'] || '';

  return `
Je beoordeelt verbeterde prompts van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Prompt Verbeter-Challenge**
Verbeter 5 zwakke prompts met de 5 tips: specifiek, context, rol, iteratief, voorbeelden.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Toepassing van tips (60%)**: De prompts zijn duidelijk verbeterd en tonen alle 5 tips
- **Creativiteit (40%)**: De prompts zijn origineel en goed doordacht

**INSTRUCTIES:**
1. Beoordeel de toepassing van de 5 tips:
   - Specifiek: Is de prompt precies en gedetailleerd?
   - Context: Is er duidelijke context voor de situatie?
   - Rol: Is er een duidelijke rol voor de AI toegewezen?
   - Iteratief: Is de prompt voorbereid op vervolgvragen?
   - Voorbeelden: Bevat de prompt concrete voorbeelden?

2. Beoordeel de creativiteit:
   - Hoe origineel zijn de verbeterde prompts?
   - Hoe goed passen de prompts bij de context?
   - Hoe goed tonen ze begrip van effectieve AI-communicatie?

3. Geef feedback per prompt met concrete voorbeelden van wat goed is en wat kan worden verbeterd

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback over de promptverbeteringen in het Nederlands",
  "details": [
    {
      "id": "toepassing",
      "titel": "Toepassing van de 5 tips",
      "score": score (0-100),
      "feedback": "specifieke feedback over hoe goed de 5 tips zijn toegepast"
    },
    {
      "id": "creatief",
      "titel": "Creativiteit en originaliteit",
      "score": score (0-100),
      "feedback": "specifieke feedback over de creativiteit van de prompts"
    }
  ]
}
`;
};

export const promptKunstGalerij = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['ai-kunst-galerij'] || '';

  return `
Je beoordeelt prompts voor AI-afbeeldingen van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: AI Kunst Galerij**
Maak 3 prompts voor afbeeldingen: zelfportret toekomst, droomhuis, creatief concept.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIUM: Prompt kwaliteit (100%)**
- Specificiteit en detailniveau
- Sfeer en stijl beschrijving
- Creativiteit en originaliteit
- Structuur en organisatie van de prompt

**INSTRUCTIES:**
1. Beoordeel elke prompt op:
   - Specificiteit: Bevat voldoende details (kleur, setting, stijl)?
   - Sfeer: Wordt de gewenste sfeer goed beschreven?
   - Stijl: Is er duidelijke verwijzing naar een artistieke stijl?
   - Creativiteit: Hoe origineel en uniek is de concept?
   - Structuur: Is de prompt logisch opgebouwd?

2. Geef feedback per prompt met:
   - Wat goed werkt in de prompt
   - Wat kan worden verbeterd
   - Voorbeelden van nog betere beschrijvingen

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": score (0-100),
  "feedback": "feedback over de kwaliteit van de afbeelding prompts in het Nederlands",
  "details": [
    {
      "id": "prompt_kwaliteit",
      "titel": "Prompt kwaliteit voor AI-afbeeldingen",
      "score": score (0-100),
      "feedback": "specifieke feedback over de kwaliteit en effectiviteit van de prompts"
    }
  ]
}
`;
};

export const promptAIProject = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['ai-project'] || '';

  return `
Je beoordeelt een reflectie op een AI tools portfolio van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: AI Project**
Reflectie op ervaringen met AI tools: makkelijkste tool, beste prompt, opvallende antwoorden, AI-limitaties, schoolgebruik.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Toepassing (50%)**: Toepassing van geleerde concepten in de praktijk
- **Reflectie (30%)**: Diepe reflectie op ervaringen en inzichten
- **Presentatie (20%)**: Klarheid en structuur van de reflectie

**INSTRUCTIES:**
1. Beoordeel de toepassing:
   - Toont de leerling begrip van de geleerde concepten?
   - Kan de leerling de verschillen tussen tools uitleggen?
   - Heeft de leerling effectieve prompts gebruikt?

2. Beoordeel de reflectie:
   - Hoe diep analyseert de leerling de AI-antwoorden?
   - Begrijpt de leerling de beperkingen van AI?
   - Geeft de leerlijk inzicht in het leerproces?

3. Beoordeel de presentatie:
   - Is de reflectie gestructureerd en duidelijk?
   - Is de taal passend voor de doelgroep?
   - Is de tekst ongeveer 250 woorden?

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback over de AI portfolio reflectie in het Nederlands",
  "details": [
    {
      "id": "toepassing",
      "titel": "Toepassing van geleerde concepten",
      "score": score (0-100),
      "feedback": "specifieke feedback over praktische toepassing"
    },
    {
      "id": "reflectie",
      "titel": "Diepe reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over diepgang van reflectie"
    },
    {
      "id": "presentatie",
      "titel": "Presentatie en structuur",
      "score": score (0-100),
      "feedback": "specifieke feedback over klarheid en structuur"
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
  // Correct antwoorden voor de quiz (gebaseerd op de vragen uit module-2.md)
  const correctAntwoorden: Record<string, string> = {
    'q1': 'C',
    'q2': 'B',
    'q3': 'B',
    'q4': 'B',
    // Les 2 quiz
    'q5': 'B',
    'q6': 'C',
    'q7': 'B',
    'q8': 'B',
    // Les 3 quiz
    'q9': 'C',
    'q10': 'B',
    'q11': 'B',
    'q12': 'B',
    'q13': 'C',
    'q14': 'B',
    'q15': 'B',
    // Les 4 quiz (Module 2 Quiz)
    'q16': 'B',
    'q17': 'B',
    'q18': 'C',
    'q19': 'B',
    'q20': 'C',
    'q21': 'B',
    'q22': 'C',
    'q23': 'B',
    'q24': 'C',
    'q25': 'C',
  };

  const details = [];
  let totaalScore = 0;
  let correctAnswers = 0;
  let totalQuestions = 0;

  // Check elke vraag
  for (const [vraagId, antwoord] of Object.entries(input.antwoorden)) {
    const correct = correctAntwoorden[vraagId];
    if (correct) {
      totalQuestions++;
      const isCorrect = antwoord.toUpperCase() === correct.toUpperCase();
      const score = isCorrect ? 100 : 0;
      totaalScore += score;

      if (isCorrect) correctAnswers++;

      details.push({
        id: vraagId,
        titel: `Vraag ${vraagId.replace('q', '')}`,
        score: score,
        feedback: isCorrect ? '✅ Correct!' : `❌ Fout. Het juiste antwoord is: ${correct}`
      });
    }
  }

  const percentageScore = totalQuestions > 0 ? Math.round((totaalScore / (totalQuestions * 100)) * 100) : 0;

  return {
    score: percentageScore,
    feedback: `Je scoorde ${percentageScore}%. ${correctAnswers} van de ${totalQuestions} vragen correct.`,
    details
  };
};

// Helper functie om de juiste prompt te selecteren
export const getPromptForVraag = (vraagId: string, input: OpdrachtPromptInput): string => {
  switch (vraagId) {
    case 'eerste-date':
      return promptEersteDate(input);
    case 'prompt-verbeter':
      return promptPromptChallenge(input);
    case 'ai-kunst-galerij':
      return promptKunstGalerij(input);
    case 'ai-project':
      return promptAIProject(input);
    default:
      throw new Error(`Onbekende vraag ID: ${vraagId}`);
  }
};