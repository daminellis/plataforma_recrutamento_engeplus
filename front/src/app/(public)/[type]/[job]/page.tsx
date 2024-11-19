import { AppButton } from "@/components/ui/button/AppButton";
import { PublicLayout } from "../../components/PublicLayout";
import { formatUrlToText } from "@/utils/textTransform";
import { AppBadge } from "@/components/ui/AppBadge";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SummaryItem } from "./components/SummaryItem";
import {
  EventOutlined,
  HomeWorkOutlined,
  LocationOnOutlined,
  PaymentsOutlined,
  PermContactCalendarOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { SocialMedias } from "./components/SocialMedias";
import { PublicJobs } from "../../components/PublicJobs";
import { api } from "@/service/axios";
import { JobDetails } from "@/types/Job";
import { formatSalaryMinMax } from "@/utils/formatNumbers";

interface JobPageProps {
  params: {
    job: string;
  };
}

export async function generateMetadata({ params }: JobPageProps) {
  const job = formatUrlToText(params.job);

  return {
    title: `Vaga de ${job}`,
    description: `Confira a vaga de emprego disponível para ${job}`,
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const jobTitle = formatUrlToText(params.job);
  const jobId = params.job.split("-")[0];

  const jobData = (await api.get(`vagas/find/${jobId}`)).data as JobDetails;

  return (
    <PublicLayout title="Detalhes da vaga">
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">{jobTitle}</h1>

          <div className="flex mt-2">
            {jobData.tags?.map((tag) => (
              <AppBadge key={tag.id} text={tag.nome} corTag={tag.corTag} />
            ))}
          </div>
        </div>

        <AppButton className="max-md:hidden" href={`${params.job}/aplicar`}>
          Aplicar agora <ArrowRightIcon />
        </AppButton>
      </section>

      <section className="flex mt-5 gap-10 max-md:flex-col-reverse">
        <article className="md:flex-1 md:min-w-80 max-md:min-h-80">
          <h2 className="font-medium text-lg">Descrição da vaga</h2>
          <div
            className="text-base text-gray-500"
            dangerouslySetInnerHTML={{ __html: jobData.descricao }}
          ></div>

          <h2 className="font-medium text-lg mt-8">Responsabilidades</h2>
          <ul>
            {jobData.responsabilidades.map((responsability, i) => (
              <li key={i}>{responsability}</li>
            ))}
          </ul>
          <AppButton className="md:hidden mt-5" href={`${params.job}/aplicar`}>
            Aplicar agora <ArrowRightIcon />
          </AppButton>
        </article>

        <article className="max-w-[32.5rem] w-full flex flex-col gap-5">
          <div className="h-fit p-8 border border-gray-400 rounded-lg flex flex-col gap-6">
            <h2 className="font-medium text-xl">Resumo</h2>

            <div className="flex flex-wrap space-y-5 items-end">
              <SummaryItem
                Icon={EventOutlined}
                title="Vaga postada"
                value={new Date(jobData.dataPostagem).toLocaleDateString()}
              />
              <SummaryItem
                Icon={SchoolOutlined}
                title="Escolaridade"
                value={jobData.educacao}
              />
              <SummaryItem
                Icon={PaymentsOutlined}
                title="Salário"
                value={formatSalaryMinMax(
                  jobData.salarioMinimo,
                  jobData.salarioMaximo
                )}
              />
              <SummaryItem
                Icon={LocationOnOutlined}
                title="Localização"
                value={jobData.regiao}
              />
              <SummaryItem
                Icon={HomeWorkOutlined}
                title="Modalidade"
                value={jobData.modalidade}
              />
              <SummaryItem
                Icon={PermContactCalendarOutlined}
                title="Tempo de experiência"
                value={jobData.tempoExperiencia}
              />
            </div>
          </div>

          <h2 className="font-medium text-xl">Compartilhar vaga</h2>

          <SocialMedias jobTitle={jobTitle} />
        </article>
      </section>

      <section>
        <h1 className="font-medium text-4xl mt-24 mb-5">
          Empregos relacionados
        </h1>
        <PublicJobs filter={jobData.setor.nome} excpectThisJobID={jobData.id} />
      </section>
    </PublicLayout>
  );
}
