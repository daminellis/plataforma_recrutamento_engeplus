import { PublicLayout } from "@/app/(public)/components/PublicLayout";
import { formatTextUrl } from "@/app/utils/textTransform";
import { AppBadge } from "@/components/ui/AppBadge";
import { ApplyForm } from "./components/ApplyForm";

interface ApplyPageProps {
  params: {
    job: string;
  };
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const jobTitle = formatTextUrl(params.job);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <PublicLayout title="Aplicar a vaga">
      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-medium">{jobTitle}</h1>

        <div className="flex mt-2">
          <AppBadge
            text="Tempo integral"
            textColorClass="text-blue-500"
            backgroundColorClass="bg-blue-500/20"
          />
        </div>

        <div className="mt-10 w-full flex flex-col gap-5 items-center">
          <h2 className="text-xl">Preencha com suas informações</h2>

          <ApplyForm />
        </div>
      </section>
    </PublicLayout>
  );
}
