import { productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";

interface VariantSelectorProps {
  selectedVariant: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export default function VariantSelector({
  selectedVariant,
  variants,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={`rounded-lg border-2 p-1 ${variant.slug === selectedVariant ? "border-primary" : "border-transparent"} `}
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-lg object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
