import { UserType } from "@/types/Auth";
import { cookies } from "next/headers";
import { CardDash } from "./components/CardDash";
import { Badge, WorkRounded } from "@mui/icons-material";
import { apiAuth } from "@/service/axiosAuth";
import { JobPrivateType } from "@/types/Job";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userData = JSON.parse(
    cookieStore.get("user")?.value || "{}"
  ) as UserType;

  const axiosInstance = await apiAuth();
  const dashData = (await axiosInstance.get("vagas/all-private"))
    .data as JobPrivateType[];

  let numberOfCandidates = 0;

  dashData.forEach((job) => {
    numberOfCandidates += job.candidaturaCount;
  });

  return (
    <>
      <h1 className="text-lg">Olá {userData.nomeCompleto} </h1>
      <p className="text-gray-400 text-sm">
        Aqui está seus trabalhos postados e candidatos salvos
      </p>

      <div className="flex gap-2 mt-5">
        <CardDash
          Icon={WorkRounded}
          background="bg-blue-500/20"
          colorIcon="text-blue-500"
          number={dashData.length}
          subText="Vagas abertas"
        />

        <CardDash
          Icon={Badge}
          background="bg-orange-500/20"
          colorIcon="text-orange-500"
          number={numberOfCandidates}
          subText="Candidatos salvos"
        />
      </div>
    </>
  );
}
