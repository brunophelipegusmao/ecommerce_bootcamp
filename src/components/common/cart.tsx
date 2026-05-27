"use client";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        
      </SheetContent>
    </Sheet>
  );
}
