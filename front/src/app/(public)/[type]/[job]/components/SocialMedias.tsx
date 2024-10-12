"use client";

import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { CopyLink } from "./CopyLink";
import { SocialNetworkLink } from "./SocialNetworkLink";
import { WhatsApp } from "@mui/icons-material";

interface SocialMediasProps {
  jobTitle: string;
}

export const SocialMedias = ({ jobTitle }: SocialMediasProps) => {
  const fullUrl = window.location.href;
  return (
    <div className="flex gap-2">
      <CopyLink fullUrl={fullUrl} />
      <SocialNetworkLink
        className="text-blue-500 hover:bg-blue-500 hover:text-white"
        Icon={LinkedInLogoIcon}
        name="LinkedIn"
        link={`https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}&title=${jobTitle}&summary=${jobTitle}`}
      />
      <SocialNetworkLink
        className="text-green-500 hover:bg-green-500 hover:text-white"
        Icon={WhatsApp}
        name="Whatsapp"
        link={`https://api.whatsapp.com/send/?text=Olá, encontrei uma vaga de ${jobTitle} que pode ser do seu interesse, segue o link:${fullUrl}.%20Confira!`}
      />
    </div>
  );
};
