import { PublicLayout } from "@/app/(public)/components/PublicLayout";
import { formatUrlToText } from "@/utils/textTransform";
import { AppBadge } from "@/components/ui/AppBadge";
import { ApplyForm } from "./components/ApplyForm";
import { api } from "@/service/axios";
import { JobType } from "@/types/Job";

interface ApplyPageProps {
  params: {
    job: string;
  };
}

export async function generateMetadata({ params }: ApplyPageProps) {
  const job = formatUrlToText(params.job);

  return {
    title: `Aplicar - Vaga de ${job}`,
    description: `Preencha o formulário para se candidatar a vaga de ${job}`,
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const jobTitle = formatUrlToText(params.job);
  const jobId = parseInt(params.job.split("-")[0]);

  const jobData = (await api.get(`vagas/find/${jobId}`)).data as JobType;

  return (
    <PublicLayout title="Aplicar a vaga">
      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-medium">{jobTitle}</h1>

        <div className="flex mt-2">
          {jobData.tags?.map((tag) => (
            <AppBadge key={tag.id} text={tag.nome} corTag={tag.corTag} />
          ))}
        </div>

        <div className="mt-10 w-full flex flex-col gap-5 items-center">
          <h2 className="text-xl">Preencha com suas informações</h2>

          <ApplyForm jobId={jobId} />
        </div>
      </section>
    </PublicLayout>
  );
}
