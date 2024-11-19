import { UserType } from "@/types/Auth";
import { cookies } from "next/headers";
import { CardDash } from "./components/CardDash";
import { Badge, WorkRounded } from "@mui/icons-material";
import { apiAuth } from "@/service/axiosAuth";
import { JobPrivateType } from "@/types/Job";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AppButton } from "@/components/ui/button/AppButton";
import { JobTable } from "../../components/ui/JobTable";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userData = JSON.parse(
    cookieStore.get("user")?.value || "{}"
  ) as UserType;

  const axiosInstance = await apiAuth();
  const dashData = (
    await axiosInstance.get<JobPrivateType[]>("vagas/all-private")
  ).data;

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

      <div className="flex items-center justify-between mt-16">
        <h1 className="font-bold">Vagas postadas recentemente</h1>

        <AppButton color="transparent" href="vagas">
          Ver tudo
          <ArrowRightIcon />
        </AppButton>
      </div>

      <JobTable data={dashData.slice(0, 5)} />
    </>
  );
}
