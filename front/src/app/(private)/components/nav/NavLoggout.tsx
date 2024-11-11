"use client";

import { ExitIcon } from "@radix-ui/react-icons";

export const NavLoggout = () => {
  const hadleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/login";
  };
  return (
    <a
      className="px-6 py-4 flex items-center gap-3 transition-colors text-gray-800 hover:bg-blue-500/50 cursor-pointer"
      onClick={hadleLogout}
    >
      <ExitIcon className="size-5" />
      Sair
    </a>
  );
};
