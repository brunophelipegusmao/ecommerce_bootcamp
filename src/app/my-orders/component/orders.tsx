"use client";

import CartSummary from "@/app/cart/components/cart-summary";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: string;
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="space-y-4 p-5">
      {orders.map((order) => (
        <Card key={order.id} className="w-full p-4">
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value={order.id}>
                <AccordionTrigger>
                  Pedido feito em{" "}
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </AccordionTrigger>
                <AccordionContent>
                  <CartSummary
                    subtotalInCents={order.totalPriceInCents / 100}
                    totalInCents={order.totalPriceInCents / 100}
                    products={order.items.map((item) => ({
                      id: item.id,
                      name: `${item.productName} - ${item.productVariantName}`,
                      priceInCents: item.priceInCents / 100,
                      quantity: item.quantity,
                      imageUrl: item.imageUrl,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
