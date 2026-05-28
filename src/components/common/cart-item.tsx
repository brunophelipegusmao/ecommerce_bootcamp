import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatMoney } from "@/helpers/money";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-product-from-cart";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-product-from-cart";
interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export default function CartItem({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProductMutation = useDecreaseCartProduct(id);

  const addProductToCartMutation = useIncreaseCartProduct(productVariantId);

  const queryClient = useQueryClient();

  const handleRemoveFromCart = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho");
      },
    });
  };

  const handleDecreaseCartProduct = () => {
    decreaseCartProductMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: () => {
        toast.error("Erro ao atualizar quantidade do produto");
      },
    });
  };

  const handleIncreaseCartProduct = () => {
    addProductToCartMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: () => {
        toast.error("Erro ao atualizar quantidade do produto");
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div>
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-sm font-medium">
            {productVariantName}
          </p>
          <div className="flex w-20 items-center justify-between rounded-lg border p-1">
            {quantity === 1 ? (
              <Button
                className="h-3 w-3"
                variant="ghost"
                onClick={handleRemoveFromCart}
              >
                <TrashIcon />
              </Button>
            ) : (
              <Button
                className="h-3 w-3"
                variant="ghost"
                onClick={handleDecreaseCartProduct}
              >
                <MinusIcon />
              </Button>
            )}
            <span className="text-xs font-medium">{quantity}</span>
            <Button
              className="h-3 w-3"
              variant="ghost"
              onClick={handleIncreaseCartProduct}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <span className="text-base font-semibold">
          {formatMoney(productVariantPriceInCents)}
        </span>
      </div>
    </div>
  );
}
