import { categoryTable } from "@/db/schema";
import { Button } from "../button";
import Link from "next/link";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export default function CategorySelector({
  categories,
}: CategorySelectorProps) {
  return (
    <div className="bg-chart-1 rounded-3xl p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="bg-card rounded-full font-semibold"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
