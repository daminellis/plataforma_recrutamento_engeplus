"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkPrivateProps = { href: string; children: React.ReactNode };

export const NavLinkPrivate = ({ href, children }: NavLinkPrivateProps) => {
  const pathname = usePathname();
  const newHref = `/admin/${href}`;
  return (
    <Link
      className={`px-6 py-4 flex items-center gap-3 transition-colors ${
        pathname == newHref
          ? "border-l-8 border-blue-500 text-blue-500 bg-blue-500/20"
          : "text-gray-800 hover:bg-blue-500/50"
      }`}
      href={newHref}
    >
      {children}
    </Link>
  );
};
