import { cookies } from "next/headers";
import Image from "next/image";

export const Profile = async () => {
  const cookieStore = await cookies();
  const userData = JSON.parse(cookieStore.get("user")?.value || "{}");

  const imageUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userData?.nomeCompleto}`;

  return (
    <Image
      src={imageUrl}
      alt="Foto de perfil"
      className="rounded-full"
      width={50}
      height={50}
    />
  );
};
