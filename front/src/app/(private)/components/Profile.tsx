"use client";

import { UserType } from "@/types/Auth";
import { getUserInfos } from "@/utils/getAuthLocalStorage";
import Image from "next/image";

export const Profile = () => {
  const userData = getUserInfos();

  return (
    <Image
      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userData?.nomeCompleto}`}
      alt="Foto de perfil"
      className="rounded-full"
      width={50}
      height={50}
    />
  );
};
