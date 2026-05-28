import { getAddresses } from "@/actions/get-addresses";
import { shippingAddressTable } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

export const getUserAddressesQueryKey = () => ["addresses"] as const;

export const useAddressesQuery = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getUserAddressesQueryKey(),
    queryFn: () => getAddresses(),
    initialData: params?.initialData,
  });
};
