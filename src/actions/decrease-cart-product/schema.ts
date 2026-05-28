import z from "zod";

export const decreaseCartProductSchema = z.object({
    cartItemId: z.uuid(),
});

export type DecreaseCartProductInput = z.infer<typeof decreaseCartProductSchema>;