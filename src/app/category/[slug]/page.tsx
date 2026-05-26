import Header from "@/components/ui/common/header";
import ProductItem from "@/components/ui/common/productItem";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { text } from 'drizzle-orm/pg-core';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return NotFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: { variants: true },
  });

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        <h2>{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} textContainerClassname="w-full" />
          ))}
        </div>
      </div>
    </>
  );
}
function NotFound() {
  throw new Error("Function not implemented.");
}
