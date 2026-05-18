import Header from "@/components/ui/common/header";
import Image from "next/image";
import ProductsList from "@/components/ui/common/produtsList";
import { db } from "@/db";
import CategorySelector from "@/components/ui/common/categorySelector";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Footer from "@/components/ui/common/footer";


export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const categories = await db.query.categoryTable.findMany();

  const newlyAddedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="eager"
          />
        </div>

        <ProductsList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductsList title="Novos Produtos" products={newlyAddedProducts} />
      </div>
      <Footer />
    </>
  );
}
