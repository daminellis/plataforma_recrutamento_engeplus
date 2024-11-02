"use client";
import { DashboardIcon, SectionIcon } from "@radix-ui/react-icons";
import { CardJob } from "./ui/CardJob";
import { useEffect, useState } from "react";
import { JobType } from "@/types/Job";
import { api } from "@/service/axios";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/ui/Loading";

type PublicJobsProps = {
  filter?: string;
  excpectThisJobID?: number;
};

export const PublicJobs = ({ filter, excpectThisJobID }: PublicJobsProps) => {
  const [isListGrid, setIsListGrid] = useState(false);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    api
      .get("vagas/all")
      .then((response) => {
        const { data } = response as { data: JobType[] };
        let filteredJobs: JobType[] = data;

        if (filter) {
          filteredJobs = data.filter((job) =>
            job.setor.nome.toLowerCase().includes(filter!.toLowerCase())
          );

          if (excpectThisJobID) {
            filteredJobs = filteredJobs.filter(
              (job) => job.id !== excpectThisJobID
            );
          }

          setJobs(filteredJobs);
        }

        if (search) {
          filteredJobs = filteredJobs.filter((job) =>
            job.titulo.toLowerCase().includes(search.toLowerCase())
          );

          setJobs(filteredJobs);
        }

        if (!search && !filter) setJobs(data);
      })
      .finally(() => setIsLoading(false));
  }, [excpectThisJobID, filter, search]);

  return (
    <>
      <div className="flex justify-end">
        <div className="w-20 h-10 border border-gray-500 rounded-md p-2 flex relative">
          <div
            className={`absolute transition-all bg-gray-500/20 rounded-sm w-[1.958rem] h-[1.417rem] z-0 ${
              isListGrid ? "right-2" : "right-[50%]"
            }`}
          />
          <GridItem onClick={() => setIsListGrid(false)}>
            <DashboardIcon />
          </GridItem>
          <GridItem onClick={() => setIsListGrid(true)}>
            <SectionIcon />
          </GridItem>
        </div>
      </div>

      <div
        className={`mt-5 flex flex-wrap gap-6 max-md:justify-center ${
          isLoading && "flex-1 items-center justify-center"
        }`}
      >
        {isLoading ? (
          <Loading size="3rem" />
        ) : (
          jobs.map((job) => (
            <CardJob key={job.id} {...job} isListGrid={isListGrid} />
          ))
        )}
      </div>
    </>
  );
};

interface GridItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const GridItem = ({ children, ...props }: GridItemProps) => {
  return (
    <span
      className="w-1/2 h-full flex items-center justify-center z-10 cursor-pointer"
      {...props}
    >
      {children}
    </span>
  );
};
