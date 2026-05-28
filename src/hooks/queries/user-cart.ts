import { getCart } from "@/actions/get-cart";
import { useQuery } from "@tanstack/react-query";

export const getUserCartQueryKey = () => ["cart"] as const;

export const useCartQuery = () => {
  return useQuery({
    queryKey: getUserCartQueryKey(),
    queryFn: () => getCart(),
  });
};
