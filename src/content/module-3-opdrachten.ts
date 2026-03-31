import { OpdrachtVraag } from '@/lib/opdracht-prompts/module-1';

export const module3Opdrachten = {
  moduleSlug: "module-3",
  lesSlug: "les-1",
  openVragen: [
    {
      id: "hallucinatie-detective",
      vraag: "Test je hallucinatie-radar:\n\n1. **Vraag ChatGPT:** \"Wie heeft de iPhone uitgevonden en in welk jaar?\"\n2. **Check het antwoord** op Google. Klopt het?\n3. **Vraag nu iets specifieks:** \"Vertel me over de Belgische uitvinder Pierre Dubois die in 1967 de eerste draagbare computer maakte.\"\n4. **Analyseer:**\n   - Klinkt het antwoord geloofwaardig?\n   - Welke details geeft ChatGPT?\n   - Check op Google: Bestaat Pierre Dubois?\n5. **Reflectie:** Hoe klonk het hallucinatie-antwoord? Wat maakte het geloofwaardig?",
      type: "tekst" as const,
      criteria: [
        {
          naam: "onderzoek",
          gewicht: 60,
          beschrijving: "Analyse van hallucinaties en verificatie van feiten"
        },
        {
          naam: "analyse",
          gewicht: 40,
          beschrijving: "Diepgaande reflectie over hoe AI-hallucinaties herkend worden"
        }
      ]
    },
    {
      id: "bias-bingo",
      vraag: "Test ChatGPT's stereotypes:\n\n1. **Test ChatGPT's stereotypes:**\n   Vraag: \"Beschrijf een typische programmeur\", \"Beschrijf een typische verpleegster\", \"Beschrijf een typische voetballer\"\n   \n2. **Analyseer:**\n   - Welk geslacht wordt vermeld?\n   - Welke leeftijd?\n   - Welke eigenschappen?\n   \n3. **Vergelijk met de realiteit:**\n   - Zijn alle programmeurs mannen? (Nee!)\n   - Zijn alle verpleegsters vrouwen? (Nee!)\n   \n4. **Discussie:**\n   Waarom geeft ChatGPT deze stereotypische beschrijvingen? Waar komt dit vandaan?",
      type: "tekst" as const,
      criteria: [
        {
          naam: "onderzoek",
          gewicht: 50,
          beschrijving: "Testen en analyseren van AI-bias in stereotypen"
        },
        {
          naam: "reflectie",
          gewicht: 50,
          beschrijving: "Reflectie op oorzaken en gevolgen van bias in AI"
        }
      ]
    },
    {
      id: "factcheck-challenge",
      vraag: "Je krijgt van je leraar 5 beweringen. Bepaal voor elk:\n\n1. Is het waar of niet?\n2. Welke bron(nen) gebruik je om het te checken?\n3. Hoe lang duurde het om de waarheid te vinden?\n\n*Voorbeeld beweringen:*\n- \"Elon Musk heeft in 2024 Twitter gekocht voor 44 miljard dollar\"\n- \"Er is een video waarin [bekende politicus] iets beledigends zegt\"\n- \"Wetenschappers hebben een manier gevonden om eeuwig te leven\"\n- \"Een nieuwe studie toont aan dat [product X] kanker geneest\"\n- \"Er is bewijs dat buitenaardse wezens contact hebben gezocht\"",
      type: "tekst" as const,
      criteria: [
        {
          naam: "methode",
          gewicht: 50,
          beschrijving: "Toepassing van de 5-stappen factcheck methode"
        },
        {
          naam: "bronnen",
          gewicht: 50,
          beschrijving: "Correct gebruik en verificatie van betrouwbare bronnen"
        }
      ]
    },
    {
      id: "eerlijkheidsdilemma",
      vraag: "Bespreek in groepjes deze scenario's. Is het OK of niet? Waarom?\n\n1. **Scenario 1:** Je laat ChatGPT een volledig verslag schrijven over een boek dat je niet gelezen hebt. Je levert het in als eigen werk.\n\n2. **Scenario 2:** Je schrijft zelf een verslag, maar vraagt ChatGPT om je inleiding te verbeteren. Je past de suggesties aan en levert het in.\n\n3. **Scenario 3:** Je gebruikt ChatGPT om 10 toetsvragen te maken over een hoofdstuk. Je gebruikt die vragen om zelf te oefenen.\n\n4. **Scenario 4:** Je hebt een schrijfopdracht. Je vraagt ChatGPT om een outline te maken. Je schrijft de volledige tekst zelf op basis van die outline.\n\n5. **Scenario 5:** Je plaatst een AI-gegenereerd gedicht op Instagram met de tekst \"Mijn nieuwe gedicht 💫\"",
      type: "tekst" as const,
      criteria: [
        {
          naam: "inzicht",
          gewicht: 60,
          beschrijving: "Inzicht in eerlijk AI-gebruik en auteursrecht"
        },
        {
          naam: "argumentatie",
          gewicht: 40,
          beschrijving: "Gestructureerde argumentatie voor ethische beslissingen"
        }
      ]
    },
    {
      id: "kritische-challenge-deel1",
      vraag: "**Deel 1: Hallucinatie-test** (10 min)\n\n1. Vraag ChatGPT om 5 feiten over een historisch figuur naar keuze\n2. Check elk feit op Google\n3. Hoeveel feiten klopten? Hoeveel waren hallucinaties?\n4. Noteer: Welke feiten waren makkelijk te verifieren? Welke niet?",
      type: "tekst" as const,
      criteria: [
        {
          naam: "onderzoek",
          gewicht: 25,
          beschrijving: "Onderzoek naar AI-hallucinaties en verificatie"
        }
      ]
    },
    {
      id: "kritische-challenge-deel2",
      vraag: "**Deel 2: Bias-onderzoek** (10 min)\n\n1. Vraag ChatGPT: \"Geef me 5 voorbeelden van grote uitvinders\"\n2. Analyseer: Hoeveel mannen? Hoeveel vrouwen? Welke landen?\n3. Vraag nu: \"Geef me 5 vrouwelijke uitvinders en 5 niet-westerse uitvinders\"\n4. Vergelijk: Zag je een bias in het eerste antwoord?",
      type: "tekst" as const,
      criteria: [
        {
          naam: "onderzoek",
          gewicht: 25,
          beschrijving: "Onderzoek naar AI-bias en representatie"
        }
      ]
    },
    {
      id: "kritische-challenge-deel3",
      vraag: "**Deel 3: Factcheck-praktijk** (10 min)\n\n1. Zoek online naar een recent nieuwsartikel over AI of technologie\n2. Pas de 5-stappen factcheck methode toe\n3. Is het artikel betrouwbaar? Waarom (niet)?\n4. Vind je dezelfde info op andere bronnen?",
      type: "tekst" as const,
      criteria: [
        {
          naam: "methode",
          gewicht: 25,
          beschrijving: "Toepassing van factcheck methoden"
        }
      ]
    },
    {
      id: "kritische-challenge-deel4",
      vraag: "**Deel 4: Eerlijkheid-scenario** (10 min)\n\nSchrijf een korte reflectie (150 woorden):\n\n\"Als ik AI zou gebruiken voor een schrijfopdracht, hoe zou ik dat eerlijk doen? Wat zou ik aan de leraar vertellen? Welke regels zou ik volgen?\"",
      type: "tekst" as const,
      criteria: [
        {
          naam: "reflectie",
          gewicht: 25,
          beschrijving: "Reflectie op eerlijk en verantwoord AI-gebruik"
        }
      ]
    }
  ],
  quizVragen: [
    {
      id: "les1-q1",
      vraag: "Wat is een AI-hallucinatie?",
      type: "quiz" as const,
      opties: [
        { label: "Wanneer AI dingen ziet die er niet zijn in afbeeldingen", waarde: "A" },
        { label: "Wanneer AI zelfverzekerd antwoordt met verzonnen informatie", waarde: "B", correct: true },
        { label: "Wanneer AI te langzaam werkt", waarde: "C" },
        { label: "Wanneer AI crasht", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les1-q2",
      vraag: "Waarom hallucineert AI?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat het slecht geprogrammeerd is", waarde: "A" },
        { label: "Omdat het patronen voorspelt, niet de waarheid kent", waarde: "B", correct: true },
        { label: "Omdat mensen het expres verkeerd leren", waarde: "C" },
        { label: "Omdat het te warm wordt", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les1-q3",
      vraag: "Wat is een rode vlag voor hallucinaties?",
      type: "quiz" as const,
      opties: [
        { label: "Korte antwoorden", waarde: "A" },
        { label: "Te specifieke details zoals namen en datums die je niet kunt verifiëren", waarde: "B", correct: true },
        { label: "Antwoorden in het Nederlands", waarde: "C" },
        { label: "Vragen om verduidelijking", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les1-q4",
      vraag: "Wat moet je ALTIJD doen met belangrijke info van AI?",
      type: "quiz" as const,
      opties: [
        { label: "Blindelings geloven", waarde: "A" },
        { label: "Verifiëren via betrouwbare bronnen", waarde: "B", correct: true },
        { label: "Het tegenovergestelde aannemen", waarde: "C" },
        { label: "Delen met iedereen", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les2-q1",
      vraag: "Wat is \"bias\" bij AI?",
      type: "quiz" as const,
      opties: [
        { label: "Een technische fout in de code", waarde: "A" },
        { label: "Systematische vooringenomenheid in AI-resultaten", waarde: "B", correct: true },
        { label: "Wanneer AI te langzaam werkt", waarde: "C" },
        { label: "Wanneer AI geen antwoord geeft", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les2-q2",
      vraag: "Hoe ontstaat bias in AI?",
      type: "quiz" as const,
      opties: [
        { label: "Door bevooroordeelde trainingsdata", waarde: "A" },
        { label: "Door onevenwichtige data", waarde: "B" },
        { label: "Door keuzes van makers", waarde: "C" },
        { label: "Alle bovenstaande", waarde: "D", correct: true }
      ],
      correctAntwoord: "D"
    },
    {
      id: "les2-q3",
      vraag: "Wat is een filterbubbel?",
      type: "quiz" as const,
      opties: [
        { label: "Een veilige omgeving op internet", waarde: "A" },
        { label: "Wanneer AI je alleen dingen toont die passen bij je bestaande voorkeuren", waarde: "B", correct: true },
        { label: "Een soort pop-up", waarde: "C" },
        { label: "Een type antivirus", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les2-q4",
      vraag: "Hoe kun je door je filterbubbel breken?",
      type: "quiz" as const,
      opties: [
        { label: "Meer scrollen op TikTok", waarde: "A" },
        { label: "Actief zoeken naar andere meningen en diverse bronnen", waarde: "B", correct: true },
        { label: "AI niet meer gebruiken", waarde: "C" },
        { label: "Alleen naar het nieuws kijken", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les3-q1",
      vraag: "Wat is een deepfake?",
      type: "quiz" as const,
      opties: [
        { label: "Een videogame", waarde: "A" },
        { label: "AI-gegenereerde video of audio die iemand anders doet lijken/zeggen", waarde: "B", correct: true },
        { label: "Een type computervirus", waarde: "C" },
        { label: "Een sociale media trend", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les3-q2",
      vraag: "Wat is de eerste stap bij factchecking?",
      type: "quiz" as const,
      opties: [
        { label: "Meteen delen met vrienden", waarde: "A" },
        { label: "STOP en niet meteen reageren", waarde: "B", correct: true },
        { label: "Boos worden", waarde: "C" },
        { label: "De AI vragen of het waar is", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les3-q3",
      vraag: "Welke bron is het MEEST betrouwbaar?",
      type: "quiz" as const,
      opties: [
        { label: "Een willekeurige Twitter-post", waarde: "A" },
        { label: "Een doorgestuurde WhatsApp-bericht", waarde: "B" },
        { label: "Een artikel van een gevestigd persbureau (Reuters, AP, VRT)", waarde: "C", correct: true },
        { label: "Een blog zonder bronvermelding", waarde: "D" }
      ],
      correctAntwoord: "C"
    },
    {
      id: "les3-q4",
      vraag: "Waarom is factchecking belangrijk?",
      type: "quiz" as const,
      opties: [
        { label: "Om populair te zijn op social media", waarde: "A" },
        { label: "Om desinformatie te voorkomen en schade te beperken", waarde: "B", correct: true },
        { label: "Om AI te bewijzen dat je slimmer bent", waarde: "C" },
        { label: "Het is niet belangrijk", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les4-q1",
      vraag: "Mag je een AI-gegenereerd essay inleveren als je eigen werk op school?",
      type: "quiz" as const,
      opties: [
        { label: "Ja, altijd", waarde: "A" },
        { label: "Nee, meestal is dit fraude", waarde: "B", correct: true },
        { label: "Alleen als niemand het merkt", waarde: "C" },
        { label: "Alleen in het Engels", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les4-q2",
      vraag: "Wat is de beste manier om AI te gebruiken voor schoolwerk?",
      type: "quiz" as const,
      opties: [
        { label: "Alles door AI laten doen", waarde: "A" },
        { label: "AI gebruiken als hulpmiddel (brainstormen, uitleg), maar het werk zelf doen", waarde: "B", correct: true },
        { label: "AI nooit gebruiken", waarde: "C" },
        { label: "AI gebruiken en niet zeggen", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les4-q3",
      vraag: "Wat moet je ALTIJD doen als je AI gebruikt voor schoolwerk?",
      type: "quiz" as const,
      opties: [
        { label: "Het geheim houden", waarde: "A" },
        { label: "Aan je leraar vragen wat de regels zijn en transparant zijn over AI-gebruik", waarde: "B", correct: true },
        { label: "Het ontkennen als iemand vraagt", waarde: "C" },
        { label: "De AI antwoorden iets aanpassen", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les4-q4",
      vraag: "Waarom is het belangrijk om eerlijk te zijn over AI-gebruik?",
      type: "quiz" as const,
      opties: [
        { label: "Om populair te zijn", waarde: "A" },
        { label: "Om integriteit en vertrouwen te behouden, en zelf te leren", waarde: "B", correct: true },
        { label: "Om AI bedrijven te helpen", waarde: "C" },
        { label: "Het is niet belangrijk", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q1",
      vraag: "Wat is een AI-hallucinatie?",
      type: "quiz" as const,
      opties: [
        { label: "Wanneer AI dromen heeft", waarde: "A" },
        { label: "Wanneer AI zelfverzekerd antwoordt met verzonnen informatie", waarde: "B", correct: true },
        { label: "Wanneer AI te snel werkt", waarde: "C" },
        { label: "Wanneer AI afbeeldingen maakt", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q2",
      vraag: "Wat is bias bij AI?",
      type: "quiz" as const,
      opties: [
        { label: "Een type computerfout", waarde: "A" },
        { label: "Systematische vooringenomenheid in AI-resultaten", waarde: "B", correct: true },
        { label: "Een AI-merk", waarde: "C" },
        { label: "Een beveiligingslek", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q3",
      vraag: "Wat is een filterbubbel?",
      type: "quiz" as const,
      opties: [
        { label: "Een soort pop-up", waarde: "A" },
        { label: "Wanneer AI je alleen dingen toont die passen bij je bestaande voorkeuren", waarde: "B", correct: true },
        { label: "Een type AI", waarde: "C" },
        { label: "Een beveiligingsfunctie", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q4",
      vraag: "Wat is een deepfake?",
      type: "quiz" as const,
      opties: [
        { label: "Een videogame", waarde: "A" },
        { label: "AI-gegenereerde video of audio die iemand anders doet lijken/zeggen", waarde: "B", correct: true },
        { label: "Een type virus", waarde: "C" },
        { label: "Een sociale media filter", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q5",
      vraag: "Wat is de eerste stap bij factchecking?",
      type: "quiz" as const,
      opties: [
        { label: "Het meteen delen", waarde: "A" },
        { label: "STOP en niet meteen reageren", waarde: "B", correct: true },
        { label: "De AI vragen", waarde: "C" },
        { label: "Google openen", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q6",
      vraag: "Mag je een AI-gegenereerd essay inleveren als je eigen werk?",
      type: "quiz" as const,
      opties: [
        { label: "Ja, altijd", waarde: "A" },
        { label: "Nee, meestal is dit fraude", waarde: "B", correct: true },
        { label: "Alleen als het goed is", waarde: "C" },
        { label: "Alleen in het Engels", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q7",
      vraag: "Hoe kun je AI HET BESTE gebruiken voor schoolwerk?",
      type: "quiz" as const,
      opties: [
        { label: "Alles door AI laten doen", waarde: "A" },
        { label: "AI gebruiken als hulpmiddel, maar het werk zelf doen", waarde: "B", correct: true },
        { label: "AI nooit gebruiken", waarde: "C" },
        { label: "AI gebruiken en het geheim houden", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q8",
      vraag: "Wat is een teken van een deepfake?",
      type: "quiz" as const,
      opties: [
        { label: "Perfecte kwaliteit", waarde: "A" },
        { label: "Onnatuurlijke gezichtsbewegingen en rare knipperbewegingen", waarde: "B", correct: true },
        { label: "Te veel details", waarde: "C" },
        { label: "Te snel laden", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q9",
      vraag: "Hoe kun je door je filterbubbel breken?",
      type: "quiz" as const,
      opties: [
        { label: "Meer scrollen", waarde: "A" },
        { label: "Actief zoeken naar andere meningen en diverse bronnen", waarde: "B", correct: true },
        { label: "AI niet meer gebruiken", waarde: "C" },
        { label: "Alleen TikTok kijken", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "les5-q10",
      vraag: "Welke combinatie van tips helpt je om AI kritisch te gebruiken?",
      type: "quiz" as const,
      opties: [
        { label: "Alles geloven en nooit checken", waarde: "A" },
        { label: "Hallucinaties checken, bias herkennen, feiten verifieren, eerlijk zijn", waarde: "B", correct: true },
        { label: "AI vermijden en alleen boeken lezen", waarde: "C" },
        { label: "AI vragen om alle antwoorden", waarde: "D" }
      ],
      correctAntwoord: "B"
    }
  ]
};