import { IconType } from "@/types/Icon";

interface SocialNetworkLinkProps {
  className: string;
  Icon: IconType;
  name: string;
  link: string;
}

export const SocialNetworkLink = ({
  className,
  Icon,
  name,
  link,
}: SocialNetworkLinkProps) => {
  return (
    <a
      target="_blank"
      href={link}
      className={`flex items-center gap-2 p-2 border border-gray-400 rounded-md cursor-pointer transition-colors ${className}`}
    >
      <Icon />
      <span>{name}</span>
    </a>
  );
};
