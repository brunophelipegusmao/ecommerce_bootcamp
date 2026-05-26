import { productTable, productVariantTable } from "@/db/schema";
import { formatMoney } from "@/helpers/money";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassname?: string;
}
export default function ProductItem({
  product,
  textContainerClassname,
}: ProductItemProps) {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex max-w-37.5 flex-col gap-4 md:max-w-none"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full rounded-3xl"
      />
      <div className={cn("flex flex-col gap-1", textContainerClassname)}>
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="font-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatMoney(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
