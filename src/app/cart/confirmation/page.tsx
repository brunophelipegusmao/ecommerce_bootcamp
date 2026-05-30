import Header from "@/components/common/header";
import CartSummary from "../components/cart-summary";
import Footer from "@/components/common/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/get-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAddress } from "@/helpers/address";

import FinishOrderButton from "../components/finish-order-button";

export default async function ConfirmationPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    redirect("/login");
  }

  const cart = await getCart();

  if (cart.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <>
      <div className="space-y-4">
        <Header />

        <div className="space-y-4 px-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold">
                Confirmação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardContent>
                  {!cart.shippingAddress ? (
                    <p className="text-muted-foreground text-center text-sm">
                      Nenhum endereço de entrega selecionado.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">
                        Endereço de Entrega
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {formatAddress(cart.shippingAddress)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <FinishOrderButton />
            </CardContent>
          </Card>

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
    </>
  );
}
