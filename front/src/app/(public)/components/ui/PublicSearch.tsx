"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/components/ui/button/AppButton";
import { Divider, MenuItem, Select } from "@mui/material";
import {
  ChevronDownIcon,
  LayersIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { api } from "@/service/axios";
import { useParams, useRouter } from "next/navigation";
import { formatTextToUrl, formatUrlToText } from "@/utils/textTransform";

type SectorProps = {
  id: number;
  nome: string;
};

export const PublicSearch = () => {
  const [typejob, setTypejob] = useState<number>(0);
  const [sectors, setSectors] = useState<SectorProps[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getSectors();

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getSectors = () => {
    api
      .get("setores/all")
      .then((response) => {
        const { data } = response as { data: SectorProps[] };
        const type = params.type as string | null;

        if (!type) {
          setSectors(data);
          return;
        }

        const formatedType = formatUrlToText(type.toLowerCase(), true);

        const sectorSelected = data.find(
          (sector) => sector.nome.toLowerCase() === formatedType
        );

        setSectors(data);

        if (sectorSelected) setTypejob(sectorSelected.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const searchQuery = form.get("search") as string;
    router.push(`?search=${searchQuery}`);
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
            name="search"
            type="text"
            placeholder="Cargo, palavra-chave...."
          />
        </div>
        <Divider
          orientation={windowWidth < 768 ? "horizontal" : "vertical"}
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
              onChange={(e) => setTypejob(e.target.value as number)}
            >
              <MenuItem value={0} onClick={() => router.push("/")}>
                Todas as vagas
              </MenuItem>
              {sectors.map((sector) => (
                <MenuItem
                  key={sector.id}
                  value={sector.id}
                  onClick={() => router.push(formatTextToUrl(sector.nome))}
                >
                  {sector.nome}
                </MenuItem>
              ))}
            </Select>
          </div>
          <AppButton type="submit">Procurar</AppButton>
        </div>
      </form>
    </div>
  );
};
