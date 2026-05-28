import { createAddress } from "@/actions/create-address";
import { CreateAddressInput } from "@/actions/create-address/schema";
import { getUserAddressesQueryKey } from "@/hooks/queries/user-addresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getCreateAddressMutationKey = () => ["create-address"] as const;

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getCreateAddressMutationKey(),
    mutationFn: (data: CreateAddressInput) => createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserAddressesQueryKey() });
    },
  });
};
