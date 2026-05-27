"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, QueryClient } from '@tanstack/react-query';
import { Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export default function AddToCartButton({
  productVariantId,
  quantity,
}: AddToCartButtonProps) {
  const queryClient = new QueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
  });
  return (
    <Button
      className="rounded-full"
      variant="default"
      size="lg"
      disabled={isPending}
      onClick={() => mutate()}
    >
        {isPending && (
            <Loader2 className="animate-spin" />
        )}
      Adicionar ao carrinho
    </Button>
  );
}
