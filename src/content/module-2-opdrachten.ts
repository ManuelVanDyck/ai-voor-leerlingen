import { OpdrachtVraag } from '@/lib/opdracht-prompts/module-1';

export const module2Opdrachten = {
  moduleSlug: "module-2",
  lesSlug: "les-1",
  openVragen: [
    {
      id: "eerste-date",
      vraag: "Reflectie over je eerste ervaring met ChatGPT/Gemini:\n\n1. Wat vond je het leukst aan het gesprek met de AI?\n2. Was er iets dat verrassend was?\n3. Wat viel tegen of kon de AI niet goed doen?\n4. Hoe voelde het om met een AI te praten?\n5. Wat zou je de volgende keer anders proberen?\n\nSchrijf een korte reflectie (ongeveer 150 woorden) over je ervaringen.",
      type: "tekst" as const,
      criteria: [
        { naam: "reflectie", gewicht: 100, beschrijving: "Diepe reflectie op de ervaring met AI" }
      ],
    },
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wie heeft ChatGPT gemaakt?",
      type: "quiz" as const,
      opties: [
        { label: "Google", waarde: "A" },
        { label: "Microsoft", waarde: "B" },
        { label: "OpenAI", waarde: "C", correct: true },
        { label: "Apple", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q2",
      vraag: "Wat is het grootste voordeel van Gemini ten opzichte van ChatGPT Free?",
      type: "quiz" as const,
      opties: [
        { label: "Gemini is slimmer", waarde: "A" },
        { label: "Internet zoeken voor actuele info", waarde: "B", correct: true },
        { label: "Werkt alleen in het Engels", waarde: "C" },
        { label: "Gemini is sneller", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q3",
      vraag: "Wat is een \"hallucinatie\" bij AI?",
      type: "quiz" as const,
      opties: [
        { label: "Wanneer AI afbeeldingen ziet die er niet zijn", waarde: "A" },
        { label: "Wanneer AI iets verzint dat niet waar is", waarde: "B", correct: true },
        { label: "Wanneer AI crasht", waarde: "C" },
        { label: "Wanneer AI te langzaam werkt", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q4",
      vraag: "Welke info moet je NOOIT delen met een AI chatbot?",
      type: "quiz" as const,
      opties: [
        { label: "Je hobby's", waarde: "A" },
        { label: "Wachtwoorden en persoonlijke gegevens", waarde: "B", correct: true },
        { label: "Vragen over school", waarde: "C" },
        { label: "Je favoriete muziek", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
  ],
};

export const module2OpdrachtenLes2 = {
  moduleSlug: "module-2",
  lesSlug: "les-2",
  openVragen: [
    {
      id: "prompt-verbeter",
      vraag: "Verbeter de volgende 5 zwakke prompts met de 5 tips (specifiek, context, rol, iteratief, voorbeelden):\n\n1. \"Schrijf een email.\"\n2. \"Leg wiskunde uit.\"\n3. \"Maak een samenvatting.\"\n4. \"Geef tips.\"\n5. \"Vertaal dit.\"\n\nVoor elke prompt, schrijf een verbeterde versie die alle 5 tips toepast. Geef bij elke verbeterde prompt een korte uitleg van welke tips je gebruikt hebt.",
      type: "tekst" as const,
      criteria: [
        { naam: "toepassing", gewicht: 60, beschrijving: "Toepassing van de 5 prompt tips" },
        { naam: "creatief", gewicht: 40, beschrijving: "Creativiteit en originaliteit in de prompts" }
      ],
    },
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is een \"prompt\"?",
      type: "quiz" as const,
      opties: [
        { label: "Een pop-up op je scherm", waarde: "A" },
        { label: "De tekst die je in een AI tool intoetst", waarde: "B", correct: true },
        { label: "Een soort computerprogramma", waarde: "C" },
        { label: "Een AI-foutmelding", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q2",
      vraag: "Welke prompt is het BESTE?",
      type: "quiz" as const,
      opties: [
        { label: "\"Help\"", waarde: "A" },
        { label: "\"Help met mijn huiswerk\"", waarde: "B" },
        { label: "\"Leg kwadratische vergelijkingen uit met voorbeelden alsof ik 14 ben\"", waarde: "C", correct: true },
        { label: "\"Wiskunde\"", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q3",
      vraag: "Waarom is het geven van een \"rol\" aan AI handig?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat AI dan sneller werkt", waarde: "A" },
        { label: "Omdat AI dan antwoordt vanuit een expertise-perspectief", waarde: "B", correct: true },
        { label: "Omdat AI dan minder fouten maakt", waarde: "C" },
        { label: "Omdat het verplicht is", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q4",
      vraag: "Wat betekent \"iteratief vragen\"?",
      type: "quiz" as const,
      opties: [
        { label: "Dezelfde vraag 10 keer stellen", waarde: "A" },
        { label: "Vervolgvragen stellen om dieper in te gaan op het antwoord", waarde: "B", correct: true },
        { label: "Alleen in het Engels vragen", waarde: "C" },
        { label: "Vragen stellen zonder te wachten op antwoord", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
  ],
};

export const module2OpdrachtenLes3 = {
  moduleSlug: "module-2",
  lesSlug: "les-3",
  openVragen: [
    {
      id: "ai-kunst-galerij",
      vraag: "Maak 3 verschillende prompts voor AI-afbeeldingen:\n\n1. **Zelfportret in toekomst:** \"Mij als 25-jarige in mijn droombaan als [jouw droombaan], realistisch, moderne setting\"\n2. **Droomhuis:** \"Een [modern/houten/villa] huis in [bos/aan zee/in de bergen], [zonnig/mysterieus/zonsondergang], gedetailleerd\"\n3. **Creatief concept:** \"Een [dier naar keuze] die [activiteit naar keuze] in [setting naar keuze], [stijl naar keuze]\"\n\nVoor elke afbeelding, schrijf een complete prompt met specifieke details, stijl-descriptors en sfeerbepaling. Probeer verschillende stijlen uit (realistisch, cartoon, cyberpunk, etc.).",
      type: "tekst" as const,
      criteria: [
        { naam: "prompt_kwaliteit", gewicht: 100, beschrijving: "Kwaliteit en specificiteit van de prompts" }
      ],
    },
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Welke tool is het beste voor complete ontwerpen (bijv. Instagram posts)?",
      type: "quiz" as const,
      opties: [
        { label: "DALL-E", waarde: "A" },
        { label: "Midjourney", waarde: "B" },
        { label: "Canva AI", waarde: "C", correct: true },
        { label: "ChatGPT", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q2",
      vraag: "Hoe gebruik je DALL-E?",
      type: "quiz" as const,
      opties: [
        { label: "Via Discord", waarde: "A" },
        { label: "Via ChatGPT", waarde: "B", correct: true },
        { label: "Via Google", waarde: "C" },
        { label: "Via Instagram", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q3",
      vraag: "Wat is een nadeel van Midjourney?",
      type: "quiz" as const,
      opties: [
        { label: "Het maakt lelijke afbeeldingen", waarde: "A" },
        { label: "Werkt via Discord en is minder intuïtief", waarde: "B", correct: true },
        { label: "Het is te duur", waarde: "C" },
        { label: "Het is te traag", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q4",
      vraag: "Welke prompt geeft het BESTE resultaat?",
      type: "quiz" as const,
      opties: [
        { label: "\"Een hond\"", waarde: "A" },
        { label: "\"Een schattige gouden retriever puppy speelt in een zonovergoten tuin, fotorealistisch, zachte belichting\"", waarde: "B", correct: true },
        { label: "\"Hond in tuin\"", waarde: "C" },
        { label: "\"Dier buiten\"", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
  ],
};

export const module2OpdrachtenLes4 = {
  moduleSlug: "module-2",
  lesSlug: "les-4",
  openVragen: [
    {
      id: "ai-project",
      vraag: "Reflectie op je AI tools portfolio:\n\n1. Welke tool vond je het makkelijkst om te gebruiken en waarom?\n2. Welke prompt gaf het beste resultaat en waarom denk je dat?\n3. Wat viel je op aan de AI-antwoorden (positief en negatief)?\n4. Was er iets dat de AI NIET goed kon? Wat was dat en waarom denk je dat?\n5. Hoe zou je deze AI tools inzetten voor je schoolwerk of hobby's?\n\nSchrijf een reflectie van ongeveer 250 woorden over je ervaringen met AI tools.",
      type: "tekst" as const,
      criteria: [
        { naam: "toepassing", gewicht: 50, beschrijving: "Toepassing van geleerde concepten in de praktijk" },
        { naam: "reflectie", gewicht: 30, beschrijving: "Diepe reflectie op ervaringen en inzichten" },
        { naam: "presentatie", gewicht: 20, beschrijving: "Klarheid en structuur van de reflectie" }
      ],
    },
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is het grootste verschil tussen ChatGPT Free en Gemini?",
      type: "quiz" as const,
      opties: [
        { label: "ChatGPT is slimmer", waarde: "A" },
        { label: "Gemini kan op internet zoeken voor actuele info", waarde: "B", correct: true },
        { label: "ChatGPT is gratis, Gemini niet", waarde: "C" },
        { label: "Gemini werkt alleen in het Engels", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q2",
      vraag: "Wat is een \"hallucinatie\" bij AI chatbots?",
      type: "quiz" as const,
      opties: [
        { label: "Wanneer de AI visuele effecten toont", waarde: "A" },
        { label: "Wanneer de AI iets verzint dat niet waar is", waarde: "B", correct: true },
        { label: "Wanneer de AI te langzaam werkt", waarde: "C" },
        { label: "Wanneer de AI crasht", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q3",
      vraag: "Welke van de volgende is GEEN tip voor betere prompts?",
      type: "quiz" as const,
      opties: [
        { label: "Wees specifiek", waarde: "A" },
        { label: "Geef een rol aan de AI", waarde: "B" },
        { label: "Gebruik alleen Engels", waarde: "C", correct: true },
        { label: "Geef voorbeelden", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q4",
      vraag: "Wat betekent \"iteratief vragen\"?",
      type: "quiz" as const,
      opties: [
        { label: "Dezelfde vraag herhalen tot je antwoord krijgt", waarde: "A" },
        { label: "Vervolgvragen stellen om dieper in te gaan op het antwoord", waarde: "B", correct: true },
        { label: "Vragen stellen in een lus", waarde: "C" },
        { label: "Alleen op donderdag vragen stellen", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q5",
      vraag: "Welke tool is het beste voor het maken van Instagram posts?",
      type: "quiz" as const,
      opties: [
        { label: "ChatGPT", waarde: "A" },
        { label: "Gemini", waarde: "B" },
        { label: "Canva AI", waarde: "C", correct: true },
        { label: "Midjourney", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q6",
      vraag: "Hoe krijg je toegang tot DALL-E voor afbeeldingen?",
      type: "quiz" as const,
      opties: [
        { label: "Via Discord", waarde: "A" },
        { label: "Via ChatGPT", waarde: "B", correct: true },
        { label: "Via Google", waarde: "C" },
        { label: "Via Canva", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q7",
      vraag: "Welke prompt geeft het WAARSCHIJNLIJK beste resultaat voor een uitleg over fotosynthese?",
      type: "quiz" as const,
      opties: [
        { label: "\"fotosynthese\"", waarde: "A" },
        { label: "\"Leg fotosynthese uit\"", waarde: "B" },
        { label: "\"Je bent een biologieLeraar. Leg fotosynthese uit met simpele voorbeelden alsof je het aan een 14-jarige uitlegt\"", waarde: "C", correct: true },
        { label: "\"Ik snap fotosynthese niet\"", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q8",
      vraag: "Wat is een nadeel van Midjourney?",
      type: "quiz" as const,
      opties: [
        { label: "Slechte kwaliteit afbeeldingen", waarde: "A" },
        { label: "Werkt via Discord en is complexer om te gebruiken", waarde: "B", correct: true },
        { label: "Het is gratis", waarde: "C" },
        { label: "Werkt te snel", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q9",
      vraag: "Wat moet je NOOIT doen bij AI tools?",
      type: "quiz" as const,
      opties: [
        { label: "Vervolgvragen stellen", waarde: "A" },
        { label: "Specifiek zijn in je prompts", waarde: "B" },
        { label: "Wachtwoorden of gevoelige info delen", waarde: "C", correct: true },
        { label: "Voorbeelden geven in je prompt", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q10",
      vraag: "Bonusvraag: Als je een afbeelding wilt maken met de beste artistieke kwaliteit, welke tool kies je?",
      type: "quiz" as const,
      opties: [
        { label: "DALL-E", waarde: "A" },
        { label: "Canva AI", waarde: "B" },
        { label: "Midjourney", waarde: "C", correct: true },
        { label: "ChatGPT", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
  ],
};