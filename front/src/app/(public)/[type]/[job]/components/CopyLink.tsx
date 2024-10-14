"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface CopyLinkProps {
  fullUrl: string;
}

export const CopyLink = ({ fullUrl }: CopyLinkProps) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);

    setCopied(true);
  };
  return (
    <button
      className="flex items-center gap-2 p-2 border border-gray-400 rounded-md cursor-pointer transition-colors text-gray-500 hover:text-white hover:bg-gray-500"
      onClick={copyLink}
    >
      {copied ? (
        <>
          <CheckIcon />
          Copiado
        </>
      ) : (
        <>
          <CopyIcon />
          Copiar
        </>
      )}
    </button>
  );
};
