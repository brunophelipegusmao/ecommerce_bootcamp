"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-25 items-center justify-between rounded-lg border">
        <Button size="icon" variant="ghost" onClick={handleDecrease}>
          <MinusIcon />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant="ghost" onClick={handleIncrease}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
