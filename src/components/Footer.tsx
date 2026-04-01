import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="font-bold text-lg mb-3 flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto group-hover:scale-105 transition-transform"
              />
              <span>AI voor Leerlingen</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI cursus voor leerlingen 3de jaar secundair onderwijs — GO! atheneum Gentbrugge
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Modules</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Wat is AI?</li>
              <li>AI Tools ontdekken</li>
              <li>AI Slim gebruiken</li>
              <li>AI in de les</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange" />
                <a href="mailto:ict@atheneumgentbrugge.be" className="hover:text-brand-orange transition-colors">
                  ict@atheneumgentbrugge.be
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>GO! atheneum Gentbrugge</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AI voor Leerlingen — GO! atheneum Gentbrugge</p>
          <p className="text-xs text-gray-600">
            Gebaseerd op{" "}
            <a href="https://aivoorstudenten.be" target="_blank" rel="noopener" className="text-brand-orange hover:underline">
              AI voor Studenten
            </a>{" "}
            (CC BY-NC-SA 4.0)
          </p>
        </div>
      </div>
    </footer>
  );
}
