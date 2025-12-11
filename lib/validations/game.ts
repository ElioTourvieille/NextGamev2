import { z } from "zod";

export const createGameSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  genre: z.enum(["ACTION", "ADVENTURE", "RPG", "STRATEGY", "SIMULATION", "SPORTS", "PUZZLE", "HORROR", "FPS"]),
  price: z.number().min(0),
  imageUrl: z.url("URL invalide"),
  publisher: z.string().min(1, "Nom de l'éditeur requis"),
  releaseDate: z.date(),
});

export const joinGameSchema = z.object({
  gameId: z.string(),
  playerName: z.string().min(2, "Minimum 2 caractères"),
});