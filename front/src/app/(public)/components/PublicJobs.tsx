"use client";
import { DashboardIcon, SectionIcon } from "@radix-ui/react-icons";
import { CardJob } from "./ui/CardJob";
import { useState } from "react";

export const PublicJobs = () => {
  const [isListGrid, setIsListGrid] = useState(false);

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

      <div className="mt-5 flex flex-wrap gap-6">
        <CardJob isListGrid={isListGrid} />
        <CardJob isListGrid={isListGrid} />
        <CardJob isListGrid={isListGrid} />
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
