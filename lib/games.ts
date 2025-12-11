import prisma from "./prisma";
import { Game } from "@/types";
import { categories } from "@/constants/categories";

function mapGenreToCategory(genre: string) {
  const category = categories.find(
    (cat) => cat.name.toUpperCase() === genre.toUpperCase()
  );
  return (
    category || {
      id: 0,
      name: genre,
      slug: genre.toLowerCase(),
      icon: "",
    }
  );
}

export async function getGames(): Promise<Game[]> {
  const games = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return games.map((game) => ({
    id: game.id,
    title: game.title,
    slug: game.title.toLowerCase().replace(/\s+/g, "-"),
    description: game.description,
    price: game.price,
    imageUrl: game.imageUrl,
    releaseDate: game.releaseDate.toISOString(),
    publisher: game.publisher,
    category: mapGenreToCategory(game.genre),
  }));
}

export async function getGameById(id: string): Promise<Game | null> {
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) return null;

  return {
    id: game.id,
    title: game.title,
    slug: game.title.toLowerCase().replace(/\s+/g, "-"),
    description: game.description,
    price: game.price,
    imageUrl: game.imageUrl,
    releaseDate: game.releaseDate.toISOString(),
    publisher: game.publisher,
    category: mapGenreToCategory(game.genre),
  };
}

