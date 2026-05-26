"use client";

import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./productItem";

interface ProductsListProps {
  title?: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export default function ProductsList({ title, products }: ProductsListProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-md px-5 font-semibold md:px-10">{title}</h3>
      <div className="flex w-full flex-row gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-x-visible md:px-10 lg:grid-cols-5 xl:grid-cols-6">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
