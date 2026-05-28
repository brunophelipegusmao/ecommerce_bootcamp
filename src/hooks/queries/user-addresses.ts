import { getAddresses } from "@/actions/get-addresses";
import { useQuery } from "@tanstack/react-query";

export const getUserAddressesQueryKey = () => ["addresses"] as const;

export const useAddressesQuery = () => {
  return useQuery({
    queryKey: getUserAddressesQueryKey(),
    queryFn: () => getAddresses(),
  });
};
