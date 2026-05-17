import { productTable, productVariantTable } from "@/db/schema";
import { formatMoney } from "@/helpers/money";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}
export default function ProductItem({ product }: ProductItemProps) {
  const firstVariant = product.variants[0];
  return (
    <Link href="/" className="flex flex-col max-w-[150px] gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={150}
        height={150}
        className="rounded-[1.5rem]"
      />
      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="font-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">{formatMoney(firstVariant.priceInCents)}</p>
      </div>
    </Link>
  );
}
