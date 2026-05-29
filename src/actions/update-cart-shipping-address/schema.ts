import z from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.uuid(),
});

export type UpdateCartShippingAddressInput = z.infer<
  typeof updateCartShippingAddressSchema
>;
