import { Breadcrumb } from "@/components/ui/nav/Breadcrumb";
import { PublicSearch } from "./ui/PublicSearch";

interface PublicLayoutProps {
  title: String;
  showSearch?: boolean;
  children?: React.ReactNode;
}

export const PublicLayout = ({
  title,
  showSearch,
  children,
}: PublicLayoutProps) => {
  return (
    <>
      <section className="bg-gray-200 p-5 flex flex-col items-center">
        <header className="flex items-center justify-between w-full max-w-screen-xl max-md:flex-col max-md:gap-3 max-md:items-start">
          <h2 className="font-medium text-lg">{title}</h2>

          <Breadcrumb initialText="Vagas" initialIndex="/" />
        </header>

        {showSearch && <PublicSearch />}
      </section>

      <main className="p-5 flex flex-col items-center">
        <div className="w-full max-w-screen-xl">{children}</div>
      </main>
    </>
  );
};
