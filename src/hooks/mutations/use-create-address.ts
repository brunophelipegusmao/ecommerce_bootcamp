import { createAddress } from "@/actions/create-address";
import { CreateAddressInput } from "@/actions/create-address/schema";
import { useMutation } from "@tanstack/react-query";

export const useCreateAddress = () => {
  return useMutation({
    mutationKey: ["create-address"],
    mutationFn: (data: CreateAddressInput) => createAddress(data),
  });
};
