import { AppButton } from "@/components/ui/button/AppButton";
import { PublicLayout } from "../../components/PublicLayout";
import { formatTextUrl } from "@/app/utils/textTransform";
import { AppBadge } from "@/components/ui/AppBadge";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface JobPageProps {
  params: {
    job: string;
  };
}

export default function JobPage({ params }: JobPageProps) {
  const jobTitle = formatTextUrl(params.job);
  return (
    <PublicLayout title="Detalhes da vaga">
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">{jobTitle}</h1>

          <div className="flex mt-2">
            <AppBadge
              text="Tempo integral"
              textColorClass="text-blue-500"
              backgroundColorClass="bg-blue-500/20"
            />
          </div>
        </div>

        <AppButton>
          Aplicar agora <ArrowRightIcon />
        </AppButton>
      </section>

      <section className="flex">
        <article className="flex-1 bg-blue-500"></article>

        <article className="w-96 h-96 bg-red-500"></article>
      </section>
    </PublicLayout>
  );
}
