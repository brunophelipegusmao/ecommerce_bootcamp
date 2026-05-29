import { getCart } from "@/actions/get-cart";
import { useQuery } from "@tanstack/react-query";

export const getUserCartQueryKey = () => ["cart"] as const;

export const useCartQuery = (params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) => {
  return useQuery({
    queryKey: getUserCartQueryKey(),
    queryFn: () => getCart(),
    initialData: params?.initialData,
  });
};
