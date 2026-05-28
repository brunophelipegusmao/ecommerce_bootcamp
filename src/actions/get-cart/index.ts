"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { cartTable, cartItemTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCartSchema } from "./schema";

export const getCart = async () => {
  getCartSchema.parse({});
  const sessiion = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessiion?.user) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, sessiion.user.id),
    with: {
      items: {
        orderBy: [asc(cartItemTable.createdAt)],
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: sessiion.user.id,
      })
      .returning();
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
    };
  }
  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  };
};
