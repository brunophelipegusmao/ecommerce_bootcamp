"use client";

import { Button } from "@/components/ui/button";
import AddToCartButton from "./add-to-cart-button";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductActionsProps {
  productVariantId: string;
}

export default function ProductActions({
  productVariantId,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-25 items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrease}>
              <MinusIcon />
            </Button>
            <span>{quantity}</span>
            <Button size="icon" variant="ghost" onClick={handleIncrease}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5">
        <Button className="rounded-full" variant="outline" size="lg">
          Comprar agora
        </Button>
        <AddToCartButton productVariantId={productVariantId} quantity={quantity} />
      </div>
    </>
  );
}
