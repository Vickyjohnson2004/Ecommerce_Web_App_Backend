import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Order } from "@/types";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data.orders;
    },
  });
};
