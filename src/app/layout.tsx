import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI voor Leerlingen",
  description: "AI cursus voor leerlingen 3de jaar secundair onderwijs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
