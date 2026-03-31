import { OpdrachtVraag } from '@/lib/opdracht-prompts/module-1';

export const module1Opdrachten = {
  moduleSlug: "module-1",
  lesSlug: "les-3",
  openVragen: [
    {
      id: "ai-dagboek",
      vraag: "Houd gedurende 24 uur bij wanneer je AI tegenkomt. Probeer minstens 10 voorbeelden te vinden! Gebruik het schema: Tijd | App/Tool | Type AI | Wat doet het?",
      type: "tekst" as const,
    },
    {
      id: "ai-analyse",
      vraag: "Kies één app die je vaak gebruikt en analyseer dieper:\n\n1. **Welke soorten AI gebruikt deze app?** (Meerdere antwoorden mogelijk!)\n2. **Welke data verzamelt de app over jou?**\n3. **Hoe zou de app zijn zonder AI?** (Wat zou er anders zijn?)\n4. **Wat zijn de voordelen van de AI?**\n5. **Zijn er ook nadelen?**\n\nSchrijf je analyse uit in ongeveer 200 woorden.",
      type: "tekst" as const,
    },
    {
      id: "discussie",
      vraag: "In kleine groepjes bespreek je deze vragen:\n\n- \"Als AI morgen zou verdwijnen, welke app zou je het meeste missen? Waarom?\"\n- \"Welke AI vind je het slimst? En welke het minst slim?\"\n- \"Is er een app waar je minder van zou gebruiken als je wist hoeveel AI erin zit?\"\n\nNoteer de interessantste inzichten van je groep.",
      type: "tekst" as const,
    },
  ],
  quizVragen: [
    {
      id: "q1",
      vraag: "Wat is de beste definitie van AI?",
      type: "quiz" as const,
      opties: [
        { label: "Een computer die precies doet wat je programmeert", waarde: "A" },
        { label: "Een computersysteem dat kan leren van data en ervaringen", waarde: "B", correct: true },
        { label: "Een robot die menselijk is", waarde: "C" },
        { label: "Een app die altijd gelijk heeft", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q2",
      vraag: "Je ziet een advertentie op Instagram voor sneakers die je gisteren op een andere website bekeek. Welke type AI is dit?",
      type: "quiz" as const,
      opties: [
        { label: "Beeldherkenning", waarde: "A" },
        { label: "Generatieve AI", waarde: "B" },
        { label: "Aanbevelings-AI", waarde: "C", correct: true },
        { label: "Geen AI, toeval", waarde: "D" },
      ],
      correctAntwoord: "C",
    },
    {
      id: "q3",
      vraag: "Wat is een voorbeeld van beeldherkenning?",
      type: "quiz" as const,
      opties: [
        { label: "TikTok toont je video's die je leuk vindt", waarde: "A" },
        { label: "Google Photos vindt alle foto's met jouw huisdier", waarde: "B", correct: true },
        { label: "ChatGPT schrijft een gedicht", waarde: "C" },
        { label: "Netflix stelt een film voor", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q4",
      vraag: "Waarom heet generatieve AI 'generatief'?",
      type: "quiz" as const,
      opties: [
        { label: "Omdat het generaties van mensen helpt", waarde: "A" },
        { label: "Omdat het nieuwe content genereert/creëert", waarde: "B", correct: true },
        { label: "Omdat het altijd generiek is", waarde: "C" },
        { label: "Omdat het origineel is", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q5",
      vraag: "Welke uitspraak is WAAR?",
      type: "quiz" as const,
      opties: [
        { label: "AI is altijd 100% correct", waarde: "A" },
        { label: "AI leert van data die mensen produceren", waarde: "B", correct: true },
        { label: "AI bestaat pas sinds 2020", waarde: "C" },
        { label: "AI werkt alleen op computers, niet op telefoons", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q6",
      vraag: "Je gebruikt een filter op Snapchat die je ogen groter maakt. Hoe werkt dit?",
      type: "quiz" as const,
      opties: [
        { label: "De AI herkent je gezicht en past het aan", waarde: "A", correct: true },
        { label: "Het is een vaste filter die bij iedereen hetzelfde werkt", waarde: "B" },
        { label: "Een mens bewerkt je foto handmatig", waarde: "C" },
        { label: "Het is toeval", waarde: "D" },
      ],
      correctAntwoord: "A",
    },
    {
      id: "q7",
      vraag: "Wat is een nadeel van aanbevelings-AI?",
      type: "quiz" as const,
      opties: [
        { label: "Het werkt te snel", waarde: "A" },
        { label: "Het kan leiden tot een filterbubbel (je ziet steeds hetzelfde)", waarde: "B", correct: true },
        { label: "Het is te duur", waarde: "C" },
        { label: "Het werkt niet op telefoons", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q8",
      vraag: "ChatGPT kan:",
      type: "quiz" as const,
      opties: [
        { label: "Alleen vragen beantwoorden die eerder gesteld zijn", waarde: "A" },
        { label: "Nieuwe teksten genereren op basis van wat je vraagt", waarde: "B", correct: true },
        { label: "Alleen in het Engels werken", waarde: "C" },
        { label: "Alleen over technologie praten", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
    {
      id: "q9",
      vraag: "Waarom is AI de laatste jaren zo populair geworden?",
      type: "quiz" as const,
      opties: [
        { label: "Er is meer data, betere computers en slimmere technieken", waarde: "A", correct: true },
        { label: "AI is pas Recent uitgevonden", waarde: "B" },
        { label: "Mensen zijn luier geworden", waarde: "C" },
        { label: "Het is verplicht in apps", waarde: "D" },
      ],
      correctAntwoord: "A",
    },
    {
      id: "q10",
      vraag: "Als je een app zou maken die foto's van katten herkent, welke type AI zou je nodig hebben?",
      type: "quiz" as const,
      opties: [
        { label: "Aanbevelings-AI", waarde: "A" },
        { label: "Beeldherkenning", waarde: "B", correct: true },
        { label: "Generatieve AI", waarde: "C" },
        { label: "Een combinatie van alle drie", waarde: "D" },
      ],
      correctAntwoord: "B",
    },
  ]
};