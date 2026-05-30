import { finishOrder } from "@/actions/finish-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserCartQueryKey } from "../queries/user-cart";

export const getUseFinishOrderMutattionKey = () => ["finish-order"] as const;

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseFinishOrderMutattionKey(),
    mutationFn: async () => {
      await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() });
    },
  });
};
