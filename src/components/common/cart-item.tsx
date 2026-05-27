import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatMoney } from "@/helpers/money";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export default function CartItem({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
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
              <Button className="h-3 w-3" variant="ghost" onClick={() => {}}>
                <TrashIcon />
              </Button>
            ) : (
              <Button className="h-3 w-3" variant="ghost" onClick={() => {}}>
                <MinusIcon />
              </Button>
            )}
            <span className="text-xs font-medium">{quantity}</span>
            <Button className="h-3 w-3" variant="ghost" onClick={() => {}}>
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
