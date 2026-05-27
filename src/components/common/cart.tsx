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

export default function Cart() {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Carrinho</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cartIsPending ? (
            <p>Carregando...</p>
          ) : cart?.items.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : null}
          {cart?.items.map((item) => (
            <div key={item.id}>
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                width={100}
                height={100}
              />
              <div>
                <h3>{item.productVariant.product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
