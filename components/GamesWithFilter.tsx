"use client";

import { useState } from "react";
import { Game } from "@/types";
import CategoriesFilter from "./categoriesFilter";
import GameList from "./gameList";

interface GamesWithFilterProps {
  initialGames: Game[];
}

const GamesWithFilter = ({ initialGames }: GamesWithFilterProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>(initialGames);

  return (
    <>
      <CategoriesFilter games={initialGames} onFilteredGamesChange={setFilteredGames} />
      <GameList games={filteredGames} />
    </>
  );
};

export default GamesWithFilter;

