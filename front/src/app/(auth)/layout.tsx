import Image from "next/image";
import { CompanyNumbers } from "./components/CompanyNumbers";
import { BackpackIcon, GlobeIcon, PersonIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vagas Engeplus",
  description: "Plataforma de recrutamento Engeplus",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen w-screen"}>
        <main className="w-full h-full flex relative max-md:flex-col">
          <header className="absolute w-full px-32 py-5 max-md:px-0 max-md:flex max-md:justify-center max-md:relative">
            <Link href="/">
              <Image
                alt="Logo"
                src="/static/images/logos/LogoAzul.png"
                width={200}
                height={200}
              />
            </Link>
          </header>

          <section className="p-8 w-1/2 flex items-center justify-center max-md:w-full">
            <article className="max-w-lg w-full">{children}</article>
          </section>
          <section className="p-6 pb-20 w-1/2 flex items-end justify-center bg-auth bg-no-repeat bg-cover bg-center max-md:w-full">
            <article>
              <h2 className="text-gray-300 font-semibold text-2xl">
                Junte-se a Nós!
              </h2>
              <p className="mt-3 text-gray-400 text-sm">
                Venha fazer parte de uma empresa que está na vanguarda da
                inovação. Aqui, valorizamos a criatividade, a colaboração e o
                desejo de transformar o futuro. Se você é apaixonado por
                tecnologia e quer fazer a diferença, queremos você em nossa
                equipe!
              </p>

              <div className="flex gap-10 mt-10">
                <CompanyNumbers
                  Icon={BackpackIcon}
                  number={20}
                  description="Vagas em aberto"
                />
                <CompanyNumbers
                  Icon={PersonIcon}
                  number={100}
                  description="Colaboradores"
                />
                <CompanyNumbers
                  Icon={GlobeIcon}
                  number={1000}
                  description="Clientes de internet"
                />
              </div>
            </article>
          </section>
        </main>
      </body>
    </html>
  );
}
