import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { AppButton } from "@/components/ui/button/AppButton";
import { Profile } from "./components/Profile";
import { NavLinkPrivate } from "./components/nav/NavLinkPrivate";
import {
  BackpackIcon,
  LayersIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { NavLoggout } from "./components/nav/NavLoggout";
import { UserType } from "@/types/Auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de candidaturas",
  description: "Plataforma de recrutamento Engeplus",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const iconClass = "size-5";

  const cookieStore = await cookies();
  const userData = JSON.parse(
    cookieStore.get("user")?.value || "{}"
  ) as UserType;

  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen w-screen flex flex-col"}>
        <header className="flex justify-center p-5 border-b border-gray-300">
          <div className="flex max-md:flex-col justify-between max-md:items-center max-md:gap-5 w-full max-w-screen-xl">
            <Link href="/">
              <Image
                src="/static/images/logos/LogoAzul.png"
                alt="logo-engeplus"
                width={143}
                height={40}
              />
            </Link>

            <div className="flex items-center gap-5">
              {userData.routes.find((route) => route.route === "/auth/register")
                ?.hasAccess && (
                <AppButton color="outline" href="/register">
                  Criar usuário
                </AppButton>
              )}
              <Profile />
            </div>
          </div>
        </header>
        <div className="flex" style={{ height: "calc(100vh - 103px)" }}>
          <aside className="w-72 border-r border-gray-300 py-6">
            <h3 className="px-6 text-gray-400 text-xs uppercase">
              Gerenciador de candidaturas
            </h3>

            <nav className="mt-5 select-none flex flex-col h-full">
              <NavLinkPrivate href="dashboard">
                {" "}
                <LayersIcon className={iconClass} />
                Visão geral
              </NavLinkPrivate>

              <NavLinkPrivate href="conta">
                {" "}
                <PersonIcon className={iconClass} />
                Conta
              </NavLinkPrivate>

              {userData.routes.find((route) => route.route === "/vagas/create")
                ?.hasAccess && (
                <NavLinkPrivate href="add-vaga">
                  {" "}
                  <PlusIcon className={iconClass} />
                  Adicionar vaga
                </NavLinkPrivate>
              )}

              <NavLinkPrivate href="vagas">
                {" "}
                <BackpackIcon className={iconClass} />
                Minhas vagas
              </NavLinkPrivate>

              <div className="flex-1" />

              <NavLoggout />
            </nav>
          </aside>

          <main className="flex-1 p-5 flex flex-col overflow-auto">
            <div className="w-full max-w-screen-xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
