import { eq } from "drizzle-orm";
import { db } from "@/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { shippingAddressTable } from "@/db/schema";
import { getCart } from "@/actions/get-cart";
import Header from "@/components/common/header";
import Adresses from "./components/addresses";
import CartSummary from "../components/cart-summary";
import Footer from "@/components/common/footer";

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

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div className="space-y-4">
      <Header />

      <div className="space-y-4 px-5">
        <Adresses shippingAddress={shippingAddress} initialCart={cart} />

        <CartSummary
          subtotalInCents={cartTotalInCents}
          shippingInCents={0}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            priceInCents: item.productVariant.priceInCents,
            quantity: item.quantity,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
