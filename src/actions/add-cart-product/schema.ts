import z from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1).default(1),
});

export type AddCartProductInput = z.infer<typeof addProductToCartSchema>;