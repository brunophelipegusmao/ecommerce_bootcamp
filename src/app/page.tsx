import Header from "@/components/common/header";
import Image from "next/image";
import ProductsList from "@/components/common/produtsList";
import { db } from "@/db";
import CategorySelector from "@/components/common/categorySelector";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Footer from "@/components/common/footer";
import MarkList from "@/components/common/markList";

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

      <div className="mx-auto w-full max-w-7xl space-y-8 py-6">
        <div className="px-5 md:px-10">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-2xl"
            loading="eager"
          />
        </div>

        <MarkList />

        <ProductsList title="Mais vendidos" products={products} />

        <div className="px-5 md:px-10">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5 md:px-10">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <ProductsList title="Novos Produtos" products={newlyAddedProducts} />
      </div>
      <Footer />
    </>
  );
}
