"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";
import { getCart } from "@/actions/get-cart";
import Image from "next/image";
import CartItem from "./cart-item";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { formatMoney } from "@/helpers/money";

function CartItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-19.5 w-19.5 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export default function Cart() {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="icon" />}>
        <ShoppingBasketIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-5 pb-6">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">
                {cartIsPending ? (
                  <>
                    <CartItemSkeleton />
                    <CartItemSkeleton />
                    <CartItemSkeleton />
                  </>
                ) : cart?.items.length === 0 ? (
                  <p>Seu carrinho está vazio.</p>
                ) : null}
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatMoney(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>TOTAL</p>
                <p>{formatMoney(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Button className="w-full rounded-full mt-5">
                Finalizar compra
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
