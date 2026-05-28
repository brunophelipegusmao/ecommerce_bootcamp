"use server";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAddressesSchema } from "./schema";

export const getAddresses = async () => {
  getAddressesSchema.parse({});
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return db.query.shippingAddressTable.findMany({
    where: (address, { eq }) => eq(address.userId, session.user.id),
  });
};
