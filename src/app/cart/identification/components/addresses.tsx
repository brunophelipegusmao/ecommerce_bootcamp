"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAddressesQuery } from "@/hooks/queries/user-addresses";
import { useCartQuery } from "@/hooks/queries/user-cart";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import AddressForm from "./address-form";
import { shippingAddressTable } from "@/db/schema";
import { getCart } from "@/actions/get-cart";
import { formatAddress } from "@/helpers/address";

interface AdressesProps {
  shippingAddress: (typeof shippingAddressTable.$inferSelect)[];
  initialCart: Awaited<ReturnType<typeof getCart>>;
}

export default function Adresses({
  shippingAddress,
  initialCart,
}: AdressesProps) {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");

  const { data: addresses } = useAddressesQuery({
    initialData: shippingAddress,
  });
  const { data: cart } = useCartQuery({ initialData: initialCart });
  const { mutate: updateCartShippingAddress, isPending } =
    useUpdateCartShippingAddress();

  const hasExistingAddressSelected =
    selectedAddress !== "" && selectedAddress !== "add_new";

  function handleGoToPayment() {
    updateCartShippingAddress({ shippingAddressId: selectedAddress });
    router.push("/cart/confirmation");
  }

  useEffect(() => {
    if (cart?.shippingAddress?.id) {
      setSelectedAddress(cart.shippingAddress.id);
    }
  }, [cart]);

  return (
    <Card className="ring-muted-foreground w-full space-y-2">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Identificação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="w-full"
        >
          {addresses?.map((address) => (
            <Card key={address.id} className="ring-muted-foreground w-full">
              <CardContent>
                <div className="flex w-full items-center gap-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label
                    htmlFor={address.id}
                    className="flex min-w-0 cursor-pointer flex-col gap-0.5"
                  >
                    <span className="line-clamp-2 text-sm">
                      {formatAddress(address)}
                    </span>
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label
                  htmlFor="add_new"
                  className="flex cursor-pointer items-center px-2"
                >
                  Adicionar novo endereço
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {hasExistingAddressSelected && (
          <Button
            type="button"
            onClick={handleGoToPayment}
            disabled={isPending}
            className="mt-4 w-full rounded-full py-3"
          >
            {isPending ? "Processando..." : "Ir para pagamento"}
          </Button>
        )}
        {selectedAddress === "add_new" && (
          <div className="mt-4 flex flex-col gap-4">
            <Separator />
            <h2 className="font-semibold">Adicionar novo endereço</h2>
            <AddressForm onAddressCreated={setSelectedAddress} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
