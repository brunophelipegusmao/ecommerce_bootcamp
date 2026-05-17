import Header from "@/components/ui/common/header";
import Image from "next/image";
import { productTable } from "../db/schema";
import ProductsList from "@/components/ui/common/produtsList";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
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
          />
        </div>

        <ProductsList title="Mais vendidos" products={products} />
        
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
      </div>
    </>
  );
}
