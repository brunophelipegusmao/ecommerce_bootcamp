"use client";

import { useState } from "react";

import { useAddressesQuery } from "@/hooks/queries/user-addresses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import AddressForm from "./address-form";

export default function Adresses() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const { data: addresses } = useAddressesQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <RadioGroup
              value={selectedAddress}
              onValueChange={setSelectedAddress}
              className="w-full"
            >
              {addresses?.map((address) => (
                <Card key={address.id}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <Label
                        htmlFor={address.id}
                        className="flex cursor-pointer flex-col px-2"
                      >
                        <span className=" text-sm">
                          {address.street}, {address.number}
                          {address.complement ? ` - ${address.complement}` : ""},{" "}
                          {address.neighborhood} — {address.city}/{address.state},{" "}
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
      </CardContent>
    </Card>
  );
}
