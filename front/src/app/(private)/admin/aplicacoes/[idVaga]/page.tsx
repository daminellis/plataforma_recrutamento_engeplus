"use client";

import { usePrivateApi } from "@/hooks/usePrivateApi";
import { CandidatureType } from "@/types/Candidature";
import { Switch } from "@mui/material";
import { CandidatesItemList } from "./components/CandidatesItemList";
import { useState, useEffect } from "react";
import { Loading } from "@/components/ui/Loading";

interface AplicationPageParams {
  params: {
    idVaga: string;
  };
}

export default function AplicationPage({ params }: AplicationPageParams) {
  const [sortedData, setSortedData] = useState<CandidatureType[]>([]);
  const { data, isLoading } = usePrivateApi<CandidatureType[]>(
    `candidaturas/find/all-by-vaga/${params.idVaga}`
  );
  const [favorites, setFavorites] = useState<CandidatureType[]>([]);

  useEffect(() => {
    if (data?.length) {
      const sorted = data.sort((a, b) => {
        if (a.favorito && !b.favorito) return -1;
        if (!a.favorito && b.favorito) return 1;
        return 0;
      });

      setSortedData(sorted);
    }
  }, [data]);

  const removeFavorite = (isRemove: boolean) => {
    if (isRemove) {
      const noFavorites = sortedData.filter(
        (candidature) => candidature.favorito == false
      );

      const favorites = sortedData.filter(
        (candidature) => candidature.favorito == true
      );
      setSortedData(noFavorites);
      setFavorites(favorites);
    } else {
      setSortedData([...favorites, ...sortedData]);
      setFavorites([]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Candidatos</h1>

        <div>
          <Switch
            name="showFavorite"
            onChange={(e) => removeFavorite(e.target.checked)}
          />
          <label htmlFor="showFavorite">Ocultar favoritos?</label>
        </div>
      </div>

      <section>
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Loading size="3rem" />
          </div>
        ) : (
          sortedData.map((candidature) => (
            <CandidatesItemList
              key={candidature.id}
              state={candidature}
              setState={setSortedData}
            />
          ))
        )}
      </section>
    </>
  );
}
