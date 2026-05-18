import { categoryTable } from "@/db/schema";
import { Button } from "../button";

interface CategorySelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

export default function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl p-6 bg-chart-1">
      <div className="grid grid-cols-2 gap-3">
        {
            categories.map((category) => (
                <Button key={category.id} variant='ghost' className="bg-card rounded-full font-semibold">{category.name}</Button>
            ))  
        }
      </div>
    </div>
  );
}