"use client";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/button/PrimaryButton";
import { Breadcrumb } from "@/components/ui/nav/Breadcrumb";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { MagnifyingGlassIcon, RowsIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
  const [typejob, setTypejob] = useState('');
  return (
    <>
      <section className="bg-gray-200 p-5 flex flex-col items-center">
        <header className="flex items-center justify-between w-full max-w-screen-xl max-md:flex-col max-md:gap-3 max-md:items-start">
          <h2 className="font-medium text-lg">{title}</h2>

          <Breadcrumb initialText="Vagas" initialIndex="/" />
        </header>

        {showSearch && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <form className="flex gap-2 items-center">
              <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
              <TextField
                variant="standard"
                placeholder="Cargo, palavra-chave..."
                type="search"
                className="flex-1"
              />
              <RowsIcon className="w-5 h-5 text-blue-500" />
              <Box sx={{ minWidth: 170 }}>
                <FormControl fullWidth>
                  <InputLabel id="filtro">Área de atuação</InputLabel>
                  <Select
                    labelId="filtro"
                    id="selecionar-filtro"
                    value={typejob}
                    label="Área de atuação"
                    variant="standard"
                    onChange={(e) => setTypejob(e.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <PrimaryButton>Procurar</PrimaryButton>
            </form>
          </div>
        )}
      </section>

      <main className="p-5 flex flex-col items-center">
        <div className="w-full max-w-screen-xl">{children}</div>
      </main>
    </>
  );
};
