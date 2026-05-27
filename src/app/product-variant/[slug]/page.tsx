import { db } from "@/db";
import { eq } from "drizzle-orm";
import { productTable, productVariantTable } from "../../../db/schema";
import Header from "@/components/common/header";
import Image from "next/image";
import { formatMoney } from "@/helpers/money";

import ProductsList from "@/components/common/produtsList";
import Footer from "@/components/common/footer";
import VariantSelector from "../components/variant-selector";


import ProductActions from "../components/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return <div>Product Variant not found</div>;
  }

  const LikelyProduct = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: { variants: true },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <div className="relative h-95 w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="px-5 text-black/80">
            <VariantSelector
              variants={productVariant.product.variants}
              selectedVariant={productVariant.slug}
            />
          </div>
          <div className="px-5">
            <h2 className="text-lg font-semibold text-black/80">
              {productVariant.name}
            </h2>
            <h3 className="text-base font-medium text-black/80">
              {productVariant.product.name}
            </h3>
            <h3 className="text-lg font-semibold text-black/80">
              {formatMoney(productVariant.priceInCents)}
            </h3>
          </div>
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>
        <ProductsList
          title="Talvez você também goste"
          products={LikelyProduct}
        />
      </div>
      <Footer />
    </>
  );
}
