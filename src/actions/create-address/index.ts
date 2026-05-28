"use server";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CreateAddressInput, createAddressSchema } from "./schema";

export async function createAddress(data: CreateAddressInput) {
  createAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [address] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipentName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      cpfOrCnpj: data.cpfOrCnpj.replace(/\D/g, ""),
      phone: data.phone.replace(/\D/g, ""),
      zipCode: data.zipCode.replace(/\D/g, ""),
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      country: "BR",
    })
    .returning();

  return address;
}
