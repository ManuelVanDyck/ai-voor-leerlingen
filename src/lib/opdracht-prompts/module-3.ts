// AI Correctie prompts voor Module 3
// Opdrachten: Kritisch AI-gebruik

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

// Open vragen prompts voor Module 3
export const promptHallucinatieDetective = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['hallucinatie-detective'] || '';

  return `
Je beoordeelt een Hallucinatie-Detective verslag van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Hallucinatie-Detective**
Test je hallucinatie-radar door ChatGPT te testen en antwoorden te analyseren en verifiëren.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Onderzoek (60%)**: De leerling heeft actief hallucinaties getest en feiten geverifieerd
- **Analyse (40%)**: De leerling toont diepgaande analyse van hoe hallucinaties herkend worden

**INSTRUCTIES:**
1. Beoordeel het onderzoek:
   - Heeft de leerling minstens 2 specifieke AI-antwoorden getest?
   - Heeft de leerling de antwoorden op Google geverifieerd?
   - Is er duidelijk beschreven welke antwoorden correct en welke hallucinaties waren?
   - Heeft de leerling de methode van verificatie uitgelegd?

2. Beoordeel de analyse:
   - Toont de leerling inzicht in hoe AI-hallucinaties ontstaan?
   - Kan de leerling uitleggen wat antwoorden geloofwaardig maakte?
   - Heeft de leerlijke reflecties over de gevaren van onverifieerde AI-info?

3. Geef gedetailleerde feedback met concrete voorbeelden uit het antwoord

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands",
  "details": [
    {
      "id": "onderzoek",
      "titel": "Onderzoek",
      "score": score (0-100),
      "feedback": "specifieke feedback over het onderzoek naar hallucinaties"
    },
    {
      "id": "analyse",
      "titel": "Analyse",
      "score": score (0-100),
      "feedback": "specifieke feedback over de analyse van hallucinaties"
    }
  ]
}
`;
};

export const promptBiasBingo = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['bias-bingo'] || '';

  return `
Je beoordeelt een Bias Bingo verslag van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Bias Bingo**
Test ChatGPT's stereotypes en analyseer de resultaten op bias.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Onderzoek (50%)**: De leerling heeft actief AI-bias getest met verschillende voorbeelden
- **Reflectie (50%)**: De leerling reflecteert op oorzaken en gevolgen van bias

**INSTRUCTIES:**
1. Beoordeel het onderzoek:
   - Heeft de leerling minstens 3 verschillende stereotypen getest?
   - Is er duidelijk beschreven welk geslacht, leeftijd en eigenschappen AI noemde?
   - Heeft de leerlijke de AI-resultaten vergeleken met de realiteit?
   - Heeft de leerlijke bias geïdentificeerd in de AI-antwoorden?

2. Beoordeel de reflectie:
   - Begrijpt de leerlijk waarom AI stereotypen kan produceren?
   - Reflecteert de leerlijk op de oorzaken (trainingsdata, keuzes van makers)?
   - Heeft de leerlijke nagedacht over de impact van op bias gebaseerde AI?
   - Geeft de leerlijk suggesties om bias in AI te herkennen en te vermijden?

3. Geef gedetailleerde feedback met concrete voorbeelden uit het antwoord

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands",
  "details": [
    {
      "id": "onderzoek",
      "titel": "Onderzoek",
      "score": score (0-100),
      "feedback": "specifieke feedback over het onderzoek naar bias"
    },
    {
      "id": "reflectie",
      "titel": "Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de reflectie op bias"
    }
  ]
}
`;
};

export const promptFactcheckChallenge = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['factcheck-challenge'] || '';

  return `
Je beoordeelt een Factcheck Challenge verslag van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Factcheck Challenge**
Check 5 beweringen met de 5-stappen factcheck methode.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Methode (50%)**: Correcte toepassing van de 5-stappen factcheck methode
- **Bronnen (50%)**: Correct gebruik en verificatie van betrouwbare bronnen

**INSTRUCTIES:**
1. Beoordeel de methode:
   - Heeft de leerlijke de 5 stappen (STOP, check bron, zoek bevestiging, check datum/context, factcheck-sites) gevolgd?
   - Is er duidelijk beschreven hoe elke stap is toegepast?
   - Heeft de leerlijke gedocumenteerd hoe lang elke check duurde?
   - Is de methode systematisch en logisch uitgevoerd?

2. Beoordeel de bronnen:
   - Heeft de leerlijke minstens 2 betrouwbare bronnen per bewering gebruikt?
   - Heeft de leerlijke de betrouwbaarheid van bronnen geëvalueerd?
   - Heeft de leerlijke gevonden waarheden vergelekken met bronnen?
   - Heeft de leerlijke kritisch nagedacht over bronnenkeuze?

3. Geef gedetailleerde feedback met concrete voorbeelden uit het antwoord

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands",
  "details": [
    {
      "id": "methode",
      "titel": "Methode",
      "score": score (0-100),
      "feedback": "specifieke feedback over de factcheck methode"
    },
    {
      "id": "bronnen",
      "titel": "Bronnen",
      "score": score (0-100),
      "feedback": "specifieke feedback over het gebruik van bronnen"
    }
  ]
}
`;
};

export const promptEerlijkheidsDilemma = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoord = input.antwoorden['eerlijkheidsdilemma'] || '';

  return `
Je beoordeelt een Eerlijkheidsdilemma reflectie van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: Eerlijkheidsdilemma's**
Beoordeel 5 scenario's over eerlijk AI-gebruik en auteursrecht.

**ANTWOORD VAN LEERLING:**
${antwoord}

**BEOORDELINGSCRITERIA:**
- **Inzicht (60%)**: Inzicht in eerlijk AI-gebruik, auteursrecht en ethiek
- **Argumentatie (40%)**: Gestructureerde argumentatie voor ethische beslissingen

**INSTRUCTIES:**
1. Beoordeel het inzicht:
   - Heeft de leerlijke begrepen wat eerlijk AI-gebruik betekent?
   - Heeft de leerlijke inzicht in auteursrecht bij AI-content?
   - Heeft de learnerlijke de ethische dilemma's herkend?
   - Toont de leerlijk begrip van schoolregels rond AI-gebruik?

2. Beoordeel de argumentatie:
   - Is er duidelijk uitgelegd waarom scenario's wel/niet OK zijn?
   - Heeft de leerlijke consistentie in ethische redenering?
   - Heeft de leerlijke rekening gehouden met context (lesdoel, transparantie)?
   - Zijn de argumentaties realistisch en praktisch toepasbaar?

3. Geef gedetailleerde feedback met concrete voorbeelden uit het antwoord

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback in het Nederlands",
  "details": [
    {
      "id": "inzicht",
      "titel": "Inzicht",
      "score": score (0-100),
      "feedback": "specifieke feedback over het inzicht in eerlijk AI-gebruik"
    },
    {
      "id": "argumentatie",
      "titel": "Argumentatie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de argumentatie"
    }
  ]
}
`;
};

export const promptKritischeChallenge = (input: OpdrachtPromptInput & { antwoorden: Record<string, string> }): string => {
  const antwoorden = input.antwoorden;
  const deel1 = antwoorden['kritische-challenge-deel1'] || '';
  const deel2 = antwoorden['kritische-challenge-deel2'] || '';
  const deel3 = antwoorden['kritische-challenge-deel3'] || '';
  const deel4 = antwoorden['kritische-challenge-deel4'] || '';

  return `
Je beoordeelt de Kritische Challenge van een leerling uit 3de jaar secundair onderwijs (14-15 jaar).

**OPDRACHT: De Kritische AI-gebruiker Challenge**
Combineer alle geleerde concepten: hallucinaties, bias, factchecking en eerlijkheid.

**ANTWOORDEN VAN LEERLING:**
**Deel 1 - Hallucinatie-test:**
${deel1}

**Deel 2 - Bias-onderzoek:**
${deel2}

**Deel 3 - Factcheck-praktijk:**
${deel3}

**Deel 4 - Eerlijkheid-scenario:**
${deel4}

**BEOORDELINGSCRITERIA:**
- **Onderzoek (25%)**: Onderzoek naar AI-hallucinaties en verificatie
- **Onderzoek (25%)**: Onderzoek naar AI-bias en representatie
- **Methode (25%)**: Toepassing van factcheck methoden
- **Reflectie (25%)**: Reflectie op eerlijk en verantwoord AI-gebruik

**INSTRUCTIES:**
1. Beoordeel Deel 1 (Hallucinatie-test):
   - Heeft de leerlijke actief AI-hallucinaties getest?
   - Is er correct geverifieerd op Google?
   - Kan de leerlijk onderscheid maken tussen feiten en hallucinaties?

2. Beoordeel Deel 2 (Bias-onderzoek):
   - Heeft de leerlijke bias onderzocht in AI-resultaten?
   - Is er verschil gevonden tussen eerste en tweede vraag?
   - Toont de leerlijk inzicht in representatiekwesties?

3. Beoordeel Deel 3 (Factcheck-praktijk):
   - Heeft de leerlijke de 5-stappen methode toegepast?
   - Is de betrouwbaarheid van het artikel geëvalueerd?
   - Heeft de leerlijke meerdere bronnen gecheckt?

4. Beoordeel Deel 4 (Eerlijkheid-scenario):
   - Toont de leerlijk een realistisch plan voor eerlijk AI-gebruik?
   - Begrijpt de leerlijk de noodzaak van transparantie?
   - Heeft de leerlijke de juiste prioriteiten gesteld (leraar vragen, werk zelf doen)?

**ANTWOORD ALLEEN IN JSON-formaat:**
{
  "score": totaalscore (0-100),
  "feedback": "algemene feedback over de complete Kritische Challenge",
  "details": [
    {
      "id": "onderzoek-hallucinatie",
      "titel": "Onderzoek - Hallucinaties",
      "score": score (0-100),
      "feedback": "specifieke feedback over het hallucinatie-onderzoek"
    },
    {
      "id": "onderzoek-bias",
      "titel": "Onderzoek - Bias",
      "score": score (0-100),
      "feedback": "specifieke feedback over het bias-onderzoek"
    },
    {
      "id": "methode",
      "titel": "Factcheck Methode",
      "score": score (0-100),
      "feedback": "specifieke feedback over de factcheck methode"
    },
    {
      "id": "reflectie",
      "titel": "Eerlijkheid Reflectie",
      "score": score (0-100),
      "feedback": "specifieke feedback over de eerlijkheid reflectie"
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
  // Correct antwoorden voor alle quiz vragen in Module 3
  const correctAntwoorden: Record<string, string> = {
    'les1-q1': 'B',
    'les1-q2': 'B',
    'les1-q3': 'B',
    'les1-q4': 'B',
    'les2-q1': 'B',
    'les2-q2': 'D',
    'les2-q3': 'B',
    'les2-q4': 'B',
    'les3-q1': 'B',
    'les3-q2': 'B',
    'les3-q3': 'C',
    'les3-q4': 'B',
    'les4-q1': 'B',
    'les4-q2': 'B',
    'les4-q3': 'B',
    'les4-q4': 'B',
    'les5-q1': 'B',
    'les5-q2': 'B',
    'les5-q3': 'B',
    'les5-q4': 'B',
    'les5-q5': 'B',
    'les5-q6': 'B',
    'les5-q7': 'B',
    'les5-q8': 'B',
    'les5-q9': 'B',
    'les5-q10': 'B'
  };

  const details = [];
  let totaalScore = 0;
  let totaalVragen = 0;

  // Check elke vraag
  for (const [vraagId, antwoord] of Object.entries(input.antwoorden)) {
    if (vraagId.startsWith('q') || vraagId.startsWith('les')) {
      const correct = correctAntwoorden[vraagId];
      if (correct) {
        const isCorrect = antwoord === correct;
        const score = isCorrect ? 100 : 0;
        totaalScore += score;
        totaalVragen++;

        // Vraag titel bepalen
        let titel = '';
        if (vraagId.startsWith('les1-q')) titel = 'Vraag over Hallucinaties';
        else if (vraagId.startsWith('les2-q')) titel = 'Vraag over Bias';
        else if (vraagId.startsWith('les3-q')) titel = 'Vraag over Factchecking';
        else if (vraagId.startsWith('les4-q')) titel = 'Vraag over Eerlijkheid';
        else if (vraagId.startsWith('les5-q')) titel = 'Vraag over Compleet Module 3';
        else titel = `Vraag ${vraagId}`;

        details.push({
          id: vraagId,
          titel: titel,
          score: score,
          feedback: isCorrect ? '✅ Correct!' : `❌ Fout. Het juiste antwoord is: ${correct}`
        });
      }
    }
  }

  const percentageScore = totaalVragen > 0 ? Math.round((totaalScore / (totaalVragen * 100)) * 100) : 0;

  return {
    score: percentageScore,
    feedback: `Je scoorde ${percentageScore}%. ${totaalScore} van de ${totaalVragen * 4} punten behaald (${totaalVragen - (totaalScore / 100)}/${totaalVragen} vragen correct).`,
    details
  };
};

// Helper functie om de juiste prompt te selecteren
export const getPromptForVraag = (vraagId: string, input: OpdrachtPromptInput): string => {
  switch (vraagId) {
    case 'hallucinatie-detective':
      return promptHallucinatieDetective(input);
    case 'bias-bingo':
      return promptBiasBingo(input);
    case 'factcheck-challenge':
      return promptFactcheckChallenge(input);
    case 'eerlijkheidsdilemma':
      return promptEerlijkheidsDilemma(input);
    case 'kritische-challenge-deel1':
    case 'kritische-challenge-deel2':
    case 'kritische-challenge-deel3':
    case 'kritische-challenge-deel4':
      return promptKritischeChallenge(input);
    default:
      throw new Error(`Onbekende vraag ID: ${vraagId}`);
  }
};