"use client";

import { Button } from "@/components/ui/button";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-product-from-cart";
import { Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export default function AddToCartButton({
  productVariantId,
  quantity,
}: AddToCartButtonProps) {
  const { mutate, isPending } = useIncreaseCartProduct(productVariantId);
  return (
    <Button
      className="rounded-full"
      variant="default"
      size="lg"
      disabled={isPending}
      onClick={() => mutate(quantity)}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
}
