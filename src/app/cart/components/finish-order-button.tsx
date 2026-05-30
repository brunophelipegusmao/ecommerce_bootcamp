"use client";

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
  const [successDialogOpen, setSuccessDialogOpen] = useState(true);
  const finishOrderMutation = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full py-3"
        size="lg"
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/finishedOrder.svg"
            alt="Finished Order"
            width={200}
            height={200}
          />
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Pedido Efetuado!
            </DialogTitle>
            <DialogDescription className="text-center">
              Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
              na seção de "Meus Pedidos".
              <DialogFooter>
                <Button
                  variant="outline"
                  className="w-full py-5 rounded-full font-medium"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Pagina Inicial
                </Button>
                <Button
                  className="w-full py-5 rounded-full font-medium"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/orders";
                  }}
                >
                  Ver meus pedidos
                </Button>
              </DialogFooter>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
