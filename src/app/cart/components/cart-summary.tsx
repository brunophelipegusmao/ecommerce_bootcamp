import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/helpers/money";
import Image from "next/image";

interface CartSummaryProps {
  subtotalInCents: number;
  shippingInCents?: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    priceInCents: number;
    quantity: number;
    imageUrl: string;
  }>;
}

export default function CartSummary({
  subtotalInCents,
  shippingInCents,
  totalInCents,
  products,
}: CartSummaryProps) {
  return (
    <Card className="ring-muted-foreground">
      <CardHeader>
        <CardTitle className="text-lg">Resumo do pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatMoney(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Frete</p>
          <p className="text-muted-foreground text-sm font-medium">
            {shippingInCents ? formatMoney(shippingInCents) : "GRÁTIS"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-sm font-semibold">{formatMoney(totalInCents)}</p>
        </div>
        <div className="py-3">
          <Separator />
        </div>
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={78}
                height={78}
                className="rounded-lg"
              />

              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {product.variantName}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <p className="text-sm font-semibold">
                {formatMoney(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
