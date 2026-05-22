import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
  done: z.boolean().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
