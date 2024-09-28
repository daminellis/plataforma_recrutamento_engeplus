import { AppButton } from "@/components/ui/button/AppButton";
import { PublicLayout } from "../../components/PublicLayout";
import { formatTextUrl } from "@/app/utils/textTransform";
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

        <AppButton className="max-md:hidden">
          Aplicar agora <ArrowRightIcon />
        </AppButton>
      </section>

      <section className="flex mt-5 gap-10 max-md:flex-col-reverse">
        <article className="md:flex-1 md:min-w-80 max-md:min-h-80">
          <h2 className="font-medium text-lg">Descrição da vaga</h2>
          <p className="text-base text-gray-500">
            Integer aliquet pretium consequat. Donec et sapien id leo accumsan
            pellentesque eget maximus tellus. Duis et est ac leo rhoncus
            tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque
            quis justo sit amet arcu commodo sollicitudin. Integer finibus
            blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar
            ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas
            blandit felis id massa sodales finibus. Integer bibendum eu nulla eu
            sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque
            blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut
            non felis lacinia turpis feugiat euismod at id magna. Sed ut orci
            arcu. Suspendisse sollicitudin faucibus aliquet.
          </p>
          <p className="text-base text-gray-500">
            Nam dapibus consectetur erat in euismod. Cras urna augue, mollis
            venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum
            elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in
            neque sit amet orci interdum tincidunt.
          </p>

          <h2 className="font-medium text-lg mt-8">Responsabilidades</h2>
          <ul className="list-disc list-inside ml-2">
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Quisque semper gravida est et consectetur.</li>
          </ul>
          <AppButton className="md:hidden mt-5">
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
                value="22/12/2024"
              />
              <SummaryItem
                Icon={SchoolOutlined}
                title="Escolaridade"
                value="Graduação"
              />
              <SummaryItem
                Icon={PaymentsOutlined}
                title="Salário"
                value="R$ 3k - 5k"
              />
              <SummaryItem
                Icon={LocationOnOutlined}
                title="Localização"
                value="Criciuma - SC"
              />
              <SummaryItem
                Icon={HomeWorkOutlined}
                title="Modalidade"
                value="Tempo integral"
              />
              <SummaryItem
                Icon={PermContactCalendarOutlined}
                title="Tempo de experiência"
                value="2-5 anos"
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
        <PublicJobs />
      </section>
    </PublicLayout>
  );
}
