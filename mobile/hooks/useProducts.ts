import api from "@/lib/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<Product[]>("/products");
      console.log("Fetched products:", data);
      return data;
    },
  });

  return result;
};

export default useProducts;
