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
    <div className="bg-white shadow-md rounded-lg p-4 w-full h-20 mt-5">
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
        <input
          className="flex-1 h-full border-none outline-none"
          type="text"
          placeholder="Cargo, palavra-chave...."
          required
        />
        <Divider orientation="vertical" flexItem />
        <div className="flex justify-center items-center gap-2 m-2">
          <LayersIcon className="size-5 text-blue-500" />
          <Select
            id="filtro"
            value={typejob}
            label="Área de atuação"
            variant="standard"
            className="w-40"
            IconComponent={ChevronDownIcon}
            onChange={(e) => setTypejob(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <AppButton type="submit">Procurar</AppButton>
      </form>
    </div>
  );
};
