import { eq } from "drizzle-orm";
import { db } from "@/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { shippingAddressTable } from "@/db/schema";
import { getCart } from "@/actions/get-cart";
import Header from "@/components/common/header";
import Adresses from "./components/addresses";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    redirect("/login");
  }

  const cart = await getCart();

  if (cart.items.length === 0) {
    redirect("/");
  }

  const shippingAddress = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  return (
    <>
      <Header />
      <div className="px-5">
        <Adresses shippingAddress={shippingAddress} initialCart={cart} />
      </div>
    </>
  );
}
