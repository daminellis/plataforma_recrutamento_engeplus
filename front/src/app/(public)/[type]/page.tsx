import { formatUrlToText } from "@/utils/textTransform";
import { PublicJobs } from "../components/PublicJobs";
import { PublicLayout } from "../components/PublicLayout";

interface JobTypePageProps {
  params: {
    type: string;
  };
}

export async function generateMetadata({ params }: JobTypePageProps) {
  const type = formatUrlToText(params.type, true);

  return {
    title: `Vagas de ${type}`,
    description: `Confira as vagas de emprego disponíveis na área de ${type}`,
  };
}

export default function JobTypePage({ params }: JobTypePageProps) {
  const type = formatUrlToText(params.type, true);
  return (
    <PublicLayout title={`Vagas de ${type}`} showSearch>
      <PublicJobs filter={type} />
    </PublicLayout>
  );
}
