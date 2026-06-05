"use client";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function FinishOrderButton() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();
  const handleFinishOrder = async () => {
    const { orderId } = await finishOrderMutation.mutateAsync();
    if (!orderId) throw new Error("Failed to get order ID");
    const checkoutSession = await createCheckoutSession({ orderId });
    if (!checkoutSession.url) throw new Error("Failed to get checkout URL");
    window.location.href = checkoutSession.url;
  };

  return (
    <>
      <Button
        className="w-full rounded-full py-3"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="flex h-auto flex-col items-center justify-center gap-4">
          <Image
            src="/finishedOrder.svg"
            alt="Finished Order"
            width={200}
            height={200}
            className="h-auto"
          />
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <DialogTitle className="text-center text-xl">
              Pedido Efetuado!
            </DialogTitle>
            <DialogDescription className="text-center">
              Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
              na seção de "Meus Pedidos".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex h-auto w-full flex-col items-center justify-center gap-4 bg-transparent">
            <Button
              variant="outline"
              className="w-full rounded-full py-5 font-medium"
              size="lg"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Página Inicial
            </Button>

            <Button
              className="w-full rounded-full py-5 font-medium"
              size="lg"
              onClick={() => {
                window.location.href = "/orders";
              }}
            >
              Ver meus pedidos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
