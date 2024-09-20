"use client";

import { useState } from "react";
import { AppButton } from "@/components/ui/button/AppButton";
import { Divider, MenuItem, Select } from "@mui/material";
import {
  ChevronDownIcon,
  LayersIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export const PublicSearch = () => {
  const [typejob, setTypejob] = useState<String>("10");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-screen-xl h-20 max-md:h-fit mt-5">
      <form
        className="flex gap-4 items-center max-md:flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 items-center flex-1 max-md:w-full">
          <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
          <input
            className="flex-1 h-full border-none outline-none"
            type="text"
            placeholder="Cargo, palavra-chave...."
            required
          />
        </div>
        <Divider
          orientation={window.innerWidth < 768 ? "horizontal" : "vertical"}
          flexItem
        />
        <div className="flex gap-4 items-center w-full md:max-w-96">
          <div className="flex justify-center items-center gap-2 w-full">
            <LayersIcon className="size-5 text-blue-500 mx-2" />
            <Select
              id="filtro"
              value={typejob}
              label="Área de atuação"
              variant="standard"
              className="flex-1"
              IconComponent={ChevronDownIcon}
              onChange={(e) => setTypejob(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <AppButton type="submit">Procurar</AppButton>
        </div>
      </form>
    </div>
  );
};
