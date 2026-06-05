'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export default function CheckoutSuccessPage() {


    return (
              <Dialog open={true} onOpenChange={() => {}}>
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
    )
}