"use server";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import {
  UpdateCartShippingAddressInput,
  updateCartShippingAddressSchema,
} from "./schema";

export async function updateCartShippingAddress(
  data: UpdateCartShippingAddressInput,
) {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (address, { eq, and }) =>
      and(
        eq(address.id, data.shippingAddressId),
        eq(address.userId, session.user.id),
      ),
  });

  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const [updatedCart] = await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id))
    .returning();

  return updatedCart;
}
