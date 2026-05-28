"use client";

import { useState } from "react";

import { useAddressesQuery } from "@/hooks/queries/user-addresses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import AddressForm from "./address-form";
import { shippingAddressTable } from "@/db/schema";

interface AdressesProps {
  shippingAddress: typeof shippingAddressTable.$inferSelect[] ;
}

export default function Adresses({ shippingAddress }: AdressesProps) {
  const [selectedAddress, setSelectedAddress] = useState("");
  
  const { data: addresses } = useAddressesQuery({ initialData: shippingAddress });

  return (
    <Card className="ring-muted-foreground w-full space-y-2">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Identificação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="w-full"
        >
          {addresses?.map((address) => (
            <Card key={address.id} className="ring-muted-foreground w-full">
              <CardContent>
                <div className="flex w-full items-center gap-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label
                    htmlFor={address.id}
                    className="flex min-w-0 cursor-pointer flex-col gap-0.5"
                  >
                    <span className="line-clamp-2 text-sm">
                      {address.street}, {address.number}
                      {address.complement ? ` - ${address.complement}` : ""},{" "}
                      {address.neighborhood} - {address.city}/{address.state},{" "}
                      {address.zipCode}
                    </span>
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label
                  htmlFor="add_new"
                  className="flex cursor-pointer items-center px-2"
                >
                  Adicionar novo endereço
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <div className="mt-4 flex flex-col gap-4">
            <Separator />
            <h2 className="font-semibold">Adicionar novo endereço</h2>
            <AddressForm />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
