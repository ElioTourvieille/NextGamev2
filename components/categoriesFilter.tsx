"use client";

import React, { useState, useMemo } from "react";
import { categories } from "@/constants/categories";
import { Category, Game } from "@/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface CategoriesFilterProps {
  games: Game[];
  onFilteredGamesChange: (filteredGames: Game[]) => void;
}

const CategoriesFilter = ({ games, onFilteredGamesChange }: CategoriesFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());

  const filteredGames = useMemo(() => {
    if (selectedCategories.size === 0) {
      return games;
    }
    return games.filter((game) => selectedCategories.has(game.category.id));
  }, [games, selectedCategories]);

  React.useEffect(() => {
    onFilteredGamesChange(filteredGames);
  }, [filteredGames, onFilteredGamesChange]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
  };

  const getCategoryCount = (categoryId: number) => {
    return games.filter((game) => game.category.id === categoryId).length;
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Filtrer par catégorie</h2>
        {selectedCategories.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Réinitialiser ({selectedCategories.size})
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.has(category.id);
          const count = getCategoryCount(category.id);
          const isDisabled = count === 0;

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => !isDisabled && toggleCategory(category.id)}
              disabled={isDisabled}
              className={cn(
                "relative transition-all duration-200 hover:scale-105",
                isSelected && "ring-2 ring-blue-400 dark:ring-blue-500 shadow-lg",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="font-semibold">{category.name}</span>
              <Badge
                variant={isSelected ? "secondary" : "outline"}
                className={cn(
                  "ml-2 text-xs",
                  isSelected && "bg-white/20 dark:bg-black/20"
                )}
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {selectedCategories.size > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredGames.length} jeu{filteredGames.length > 1 ? "x" : ""} trouvé
          {filteredGames.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default CategoriesFilter;