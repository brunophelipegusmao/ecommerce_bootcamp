import z from "zod";

export const getCartSchema = z.object({});

export type GetCartInput = z.infer<typeof getCartSchema>;
