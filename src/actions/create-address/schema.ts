import z from "zod";

export const createAddressSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.email(),
  cpfOrCnpj: z.string().refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 || digits.length === 14;
  }),
  phone: z.string().refine((value) => value.replace(/\D/g, "").length === 11),
  zipCode: z.string().refine((value) => value.replace(/\D/g, "").length === 8),
  street: z.string().trim().min(1),
  number: z.string().trim().min(1),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
