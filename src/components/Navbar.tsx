"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, BookOpen, LogOut, BarChart3 } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="AI voor Leerlingen"
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="text-gray-800 hidden sm:inline">AI voor Leerlingen</span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className="text-gray-600 hover:text-brand-red hover:bg-gray-50 px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {status === "authenticated" && (
              <Link
                href="/modules"
                className="text-gray-600 hover:text-brand-red hover:bg-gray-50 px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Modules</span>
              </Link>
            )}

            {status === "authenticated" && session?.user?.email?.includes("@classroomatheneum.be") && (
              <Link
                href="/admin/voortgang"
                className="text-gray-600 hover:text-brand-red hover:bg-gray-50 px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Beheer</span>
              </Link>
            )}

            {status === "authenticated" && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-2 pl-2 border-l border-gray-300 text-gray-600 hover:text-brand-red hover:bg-gray-50 px-3 py-2 rounded-lg transition-all font-medium flex items-center gap-2"
                title="Uitloggen"
              >
                <span className="hidden md:inline text-sm">{session.user?.name?.split(" ")[0]}</span>
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
