import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { PublicHeader } from "./components/PublicHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vagas Engeplus",
  description: "Plataforma de recrutamento Engeplus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen w-screen flex flex-col"}>
        <PublicHeader />
        {children}
      </body>
    </html>
  );
}
