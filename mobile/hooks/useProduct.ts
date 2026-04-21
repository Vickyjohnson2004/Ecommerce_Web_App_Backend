import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types";

export const useProduct = (productId: string) => {
  const result = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}`);
      return data;
    },
    enabled: !!productId,
  });

  return result;
};
