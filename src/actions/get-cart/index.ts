"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { cartTable } from "@/db/schema";

export const getCart = async () => {
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
    };
  }
  return cart;
};
