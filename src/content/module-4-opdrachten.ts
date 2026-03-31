import { OpdrachtVraag } from '@/lib/opdracht-prompts/module-4';

export const module4Opdrachten = {
  moduleSlug: "module-4",
  lesSlug: "les-1",
  openVragen: [
    {
      id: "study-buddy-oefening",
      vraag: "Kies een vak waar je momenteel mee bezig bent (bijvoorbeeld geschiedenis, wiskunde, natuurwetenschappen).\n\n1. Bedenk een onderwerp of hoofdstuk dat je moeilijk vindt\n2. Stel een vraag aan AI om je te helpen studeren (samenvatting, uitleg, of oefenvragen)\n3. Maak een **screenshot** van:\n   - Je prompt (wat je vroeg)\n   - Het antwoord dat AI gaf\n4. Beschrijf in 1-2 zinnen wat je met de screenshot wilt laten zien en wat je ervan geleerd hebt.\n\nUpload je screenshot en beschrijving hier.",
      type: "tekst" as const,
      criteria: [
        { naam: "toepassing", gewicht: 70, beschrijving: "Hoe de leerling effectief AI gebruikt voor studeren" },
        { naam: "reflectie", gewicht: 30, beschrijving: "Reflectie op wat de leerling heeft geleerd" }
      ]
    }
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Waarom is het belangrijk om eerst zelf de originele tekst te lezen voordat je AI om een samenvatting vraagt?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat AI geen samenvattingen kan maken", waarde: "A" },
        { label: "Omdat je anders de stof niet echt leert en AI soms fouten kan maken", waarde: "B", correct: true },
        { label: "Omdat leraren het verbieden", waarde: "C" },
        { label: "Omdat het meer tijd kost", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q2",
      vraag: "Wat is een goede manier om AI te gebruiken bij het studeren?",
      type: "quiz" as const,
      opties: [
        { label: "AI je huiswerk laten maken en dat kopieert", waarde: "A" },
        { label: "AI vragen om toetsvragen te maken zodat je kunt oefenen", waarde: "B", correct: true },
        { label: "AI alle antwoorden laten onthouden", waarde: "C" },
        { label: "AI gebruiken in plaats van naar de les gaan", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q3",
      vraag: "Je vraagt AI: \"Leg fotosynthese uit.\" Wat is een betere prompt?",
      type: "quiz" as const,
      opties: [
        { label: "Leg fotosynthese uit", waarde: "A" },
        { label: "Leg me als ik 14 ben uit hoe fotosynthese werkt, met voorbeelden", waarde: "B", correct: true },
        { label: "Fotosynthese uitleg", waarde: "C" },
        { label: "Wat is fotosynthese ja of nee", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q4",
      vraag: "Wat moet je ALTIJD doen als AI je uitleg geeft?",
      type: "quiz" as const,
      opties: [
        { label: "Blindelings geloven dat het klopt", waarde: "A" },
        { label: "De uitleg controleren en nadenken of het logisch klinkt", waarde: "B", correct: true },
        { label: "De uitleg in je huiswerk kopieert zonder aanpassing", waarde: "C" },
        { label: "Niets, gewoon doorgaan", waarde: "D" }
      ],
      correctAntwoord: "B"
    }
  ]
};

export const module4OpdrachtenLes2 = {
  moduleSlug: "module-4",
  lesSlug: "les-2",
  openVragen: [
    {
      id: "schrijfoefening",
      vraag: "1. **Schrijf** een korte tekst van ongeveer 10 zinnen over een onderwerp naar keuze (bijvoorbeeld: \"Mijn favoriete hobby\", \"Waarom ik graag gamet\", of \"Een perfecte zaterdag\").\n\n2. **Vraag** AI om feedback op je tekst. Gebruik een prompt zoals: \"Dit is mijn tekst: [plak je tekst]. Geef me feedback: wat kan beter aan structuur, zinsbouw en inhoud?\"\n\n3. **Pas** je tekst aan op basis van de feedback.\n\n4. **Beschrijf** in een paar zinnen:\n   - Wat heb je veranderd?\n   - Waarom heb je die veranderingen gemaakt?\n   - Was de feedback nuttig?\n\nPlak hier je originele tekst, de feedback, je verbeterde versie en je beschrijving van veranderingen.",
      type: "tekst" as const,
      criteria: [
        { naam: "schrijfkwaliteit", gewicht: 40, beschrijving: "Kwaliteit van de schrijfopdracht" },
        { naam: "reflectie", gewicht: 30, beschrijving: "Reflectie op veranderingen gemaakt" },
        { naam: "verbetering", gewicht: 30, beschrijving: "Hoe de tekst verbeterd is op basis van feedback" }
      ]
    }
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is een goede manier om AI te gebruiken bij een schrijfopdracht?",
      type: "quiz" as const,
      opties: [
        { label: "AI het volledige essay laten schrijven", waarde: "A" },
        { label: "AI vragen om ideeën en feedback, maar zelf de tekst schrijven", waarde: "B", correct: true },
        { label: "Teksten van AI kopieits zonder aanpassing", waarde: "C" },
        { label: "AI gebruiken en niet vertellen dat je hulp hebt gehad", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q2",
      vraag: "Waarom is het belangrijk om ZELF te schrijven, zelfs als AI je kan helpen?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat leraren het zeggen", waarde: "A" },
        { label: "Omdat schrijven een vaardigheid is die je moet oefenen om beter te worden", waarde: "B", correct: true },
        { label: "Omdat AI altijd slechte teksten maakt", waarde: "C" },
        { label: "Omdat het verboden is", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q3",
      vraag: "Je hebt een tekst geschreven en vraagt AI om feedback. Wat doe je met die feedback?",
      type: "quiz" as const,
      opties: [
        { label: "Negeren, je tekst was al perfect", waarde: "A" },
        { label: "AI je hele tekst laten herschrijven op basis van de feedback", waarde: "B" },
        { label: "De feedback lezen en zelf bepalen wat je aanpast", waarde: "C", correct: true },
        { label: "De feedback kopieits en als je eigen reflectie inleveren", waarde: "D" }
      ],
      correctAntwoord: "C"
    },
    {
      id: "q4",
      vraag: "Welke van onderstaande manieren om AI te gebruiken is NIET eerlijk?",
      type: "quiz" as const,
      opties: [
        { label: "AI vragen om een structuur voor je boekverslag", waarde: "A" },
        { label: "AI het volledige boekverslag laten schrijven en dat als je eigen werk inleveren", waarde: "B", correct: true },
        { label: "AI vragen om spelfouten in je tekst aan te duiden", waarde: "C" },
        { label: "AI gebruiken voor brainstormen over een onderwerp", waarde: "D" }
      ],
      correctAntwoord: "B"
    }
  ]
};

export const module4OpdrachtenLes3 = {
  moduleSlug: "module-4",
  lesSlug: "les-3",
  openVragen: [
    {
      id: "spelregels-oefening",
      vraag: "Bespreek met een klasgenoot de volgende vragen:\n\n1. Op welke manieren zou AI jullie kunnen helpen bij schoolwerk?\n2. Welke regels zouden nodig zijn om AI eerlijk te gebruiken?\n3. Wat zou jullie school moeten doen om duidelijkheid te geven over AI?\n\n**Schrijf samen 5 regels op** die jullie op jullie school zouden invoeren voor AI-gebruik. Denk aan:\n- Wanneer mag AI wel/niet gebruikt worden?\n- Hoe geef je aan dat je AI hebt gebruikt?\n- Wat zijn de gevolgen bij misbruik?\n\nPlak hier jullie 5 regels en een korte uitleg bij elke regel.",
      type: "tekst" as const,
      criteria: [
        { naam: "inzicht", gewicht: 50, beschrijving: "Diepgang van inzichten over AI-gebruik" },
        { naam: "regelgeving", gewicht: 50, beschrijving: "Kwaliteit en duidelijkheid van de voorgestelde regels" }
      ]
    }
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is de eerste stap voordat je AI gebruikt voor een schoolopdracht?",
      type: "quiz" as const,
      opties: [
        { label: "Gewoon doen, het zal wel mogen", waarde: "A" },
        { label: "Vragen aan je leraar of het mag", waarde: "B", correct: true },
        { label: "Wachten tot iemand anders het vraagt", waarde: "C" },
        { label: "Aannemen dat het niet mag", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q2",
      vraag: "Waarom is transparantie over AI-gebruik belangrijk?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat leraren nieuwsgierig zijn", waarde: "A" },
        { label: "Omdat eerlijkheid essentieel is voor vertrouwen en eerlijk onderwijs", waarde: "B", correct: true },
        { label: "Omdat AI verboden is", waarde: "C" },
        { label: "Om meer punten te krijgen", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q3",
      vraag: "Welke uitspraak is WAAR?",
      type: "quiz" as const,
      opties: [
        { label: "AI mag je werk volledig overschrijven als je maar zegt dat je het hebt gebruikt", waarde: "A" },
        { label: "AI is een hulpmiddel, maar het eindresultaat moet altijd van jou zijn", waarde: "B", correct: true },
        { label: "AI gebruiken is altijd cheating", waarde: "C" },
        { label: "Je hoeft nooit te vertellen dat je AI hebt gebruikt", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q4",
      vraag: "Wat is een voorbeeld van VERKEERD AI-gebruik op school?",
      type: "quiz" as const,
      opties: [
        { label: "AI vragen om een moeilijk concept uit te leggen", waarde: "A" },
        { label: "AI je volledige essay laten schrijven en dat als eigen werk inleveren", waarde: "B", correct: true },
        { label: "AI gebruiken voor oefenvragen", waarde: "C" },
        { label: "AI vragen om feedback op je tekst", waarde: "D" }
      ],
      correctAntwoord: "B"
    }
  ]
};

export const module4OpdrachtenLes4 = {
  moduleSlug: "module-4",
  lesSlug: "les-4",
  openVragen: [
    {
      id: "reflectieverslag",
      vraag: "Schrijf een kort **reflectieverslag** (ongeveer 150-200 woorden) waarin je de volgende vragen beantwoordt:\n\n1. **Wat heb je geleerd?** Denk aan: wat is AI, hoe werkt het, wat zijn de gevaren, hoe gebruik je het slim?\n2. **Hoe ga je AI gebruiken in de toekomst?** Welke toepassingen lijken jou nuttig? Waar moet je voorzichtig mee zijn?\n3. **Wat vind je de belangrijkste les uit deze cursus?** Wat zal je onthouden en toepassen?\n\nPlak hier je reflectieverslag.",
      type: "tekst" as const,
      criteria: [
        { naam: "diepgang", gewicht: 40, beschrijving: "Diepgang van de reflectie" },
        { naam: "toepassing", gewicht: 30, beschrijving: "Hoe de leerling AI in de toekomst wil toepassen" },
        { naam: "reflectie", gewicht: 30, beschrijving: "Reflectie op het belangrijkste geleerde" }
      ]
    }
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is AI?",
      type: "quiz" as const,
      opties: [
        { label: "Een robot die kan denken als een mens", waarde: "A" },
        { label: "Computersystemen die taken kunnen uitvoeren die normaal menselijke intelligentie vereisen", waarde: "B", correct: true },
        { label: "Een soort smartphone", waarde: "C" },
        { label: "Een programma dat alleen rekenkundige problemen oplost", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q2",
      vraag: "Wat is het verschil tussen \"smalle AI\" en \"brede AI\"?",
      type: "quiz" as const,
      opties: [
        { label: "Smalle AI is kleiner dan brede AI", waarde: "A" },
        { label: "Smalle AI kan slechts één specifieke taak, brede AI zou elke menselijke taak kunnen uitvoeren", waarde: "B", correct: true },
        { label: "Smalle AI is ouderwets, brede AI is modern", waarde: "C" },
        { label: "Er is geen verschil", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q3",
      vraag: "Wat is een \"hallucinatie\" bij AI?",
      type: "quiz" as const,
      opties: [
        { label: "Wanneer AI dingen ziet die er niet zijn", waarde: "A" },
        { label: "Wanneer AI antwoorden geeft die zelfverzekerd klinken maar feitelijk onjuist zijn", waarde: "B", correct: true },
        { label: "Wanneer AI crasht", waarde: "C" },
        { label: "Wanneer AI weigert te antwoorden", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q4",
      vraag: "Wat is bias in AI?",
      type: "quiz" as const,
      opties: [
        { label: "Een technische fout in de code", waarde: "A" },
        { label: "Een voorkeur of vooringenomenheid in de AI-output, vaak gebaseerd op bevooroordeelde trainingsdata", waarde: "B", correct: true },
        { label: "Een functie om AI sneller te maken", waarde: "C" },
        { label: "Een soort AI-model", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q5",
      vraag: "Wat is factchecking?",
      type: "quiz" as const,
      opties: [
        { label: "Feiten controleren om te verifiëren of informatie waar is", waarde: "A", correct: true },
        { label: "Feiten toevoegen aan een tekst", waarde: "B" },
        { label: "Feiten verwijderen uit een tekst", waarde: "C" },
        { label: "Feiten versieren met AI", waarde: "D" }
      ],
      correctAntwoord: "A"
    },
    {
      id: "q6",
      vraag: "Wat is een prompt?",
      type: "quiz" as const,
      opties: [
        { label: "Een commando om AI te starten", waarde: "A" },
        { label: "De instructie of vraag die je aan AI geeft", waarde: "B", correct: true },
        { label: "Een foutmelding", waarde: "C" },
        { label: "Een soort AI-toepassing", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q7",
      vraag: "Waarom is auteursrecht belangrijk bij AI?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat AI auteursrecht beschermt", waarde: "A" },
        { label: "Omdat AI getraind is op bestaande content en gegenereerde content mogelijk auteursrechtelijk beschermd werk kan zijn", waarde: "B", correct: true },
        { label: "Omdat AI geen auteursrecht heeft", waarde: "C" },
        { label: "Auteursrecht is niet belangrijk bij AI", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q8",
      vraag: "Wat is een goede manier om AI te gebruiken als study buddy?",
      type: "quiz" as const,
      opties: [
        { label: "AI je toets laten maken", waarde: "A" },
        { label: "AI vragen om oefenvragen te genereren en die te beantwoorden", waarde: "B", correct: true },
        { label: "AI alle antwoorden laten onthouden", waarde: "C" },
        { label: "AI je huiswerk laten overslaan", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q9",
      vraag: "Wat is de gouden regel bij schrijfopdrachten met AI?",
      type: "quiz" as const,
      opties: [
        { label: "AI mag je tekst volledig overschrijven", waarde: "A" },
        { label: "AI mag je helpen, maar het eindresultaat moet van jou zijn", waarde: "B", correct: true },
        { label: "Je mag AI alleen gebruiken als niemand het ziet", waarde: "C" },
        { label: "AI mag alleen gebruikt worden voor spelfouten", waarde: "D" }
      ],
      correctAntwoord: "B"
    },
    {
      id: "q10",
      vraag: "Wat moet je ALTIJD doen als je AI gebruikt voor schoolwerk?",
      type: "quiz" as const,
      opties: [
        { label: "Het geheim houden", waarde: "A" },
        { label: "Eerlijk zijn en vertellen dat je AI hebt gebruikt", waarde: "B", correct: true },
        { label: "Doen alsof je alles zelf hebt gedaan", waarde: "C" },
        { label: "Alleen AI gebruiken als het niet uitmaakt", waarde: "D" }
      ],
      correctAntwoord: "B"
    }
  ]
};