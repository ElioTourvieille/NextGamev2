import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères"),
})

export const registerSchema = z.object({
  email: z.email("Email invalide"),
  name: z.string().min(2, "Minimum 2 caractères"),
  password: z.string().min(6, "Minimum 6 caractères"),
})