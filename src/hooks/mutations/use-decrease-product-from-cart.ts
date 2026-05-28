import { decreaseCartProduct } from "@/actions/decrease-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserCartQueryKey } from "../queries/user-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () =>
      decreaseCartProduct({
        cartItemId: cartItemId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() });
    }
  });
};
