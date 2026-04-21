import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

/* ---------------- SIGNUP ---------------- */
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => api.post("/auth/signup", data),

    onSuccess: (res) => {
      console.log("Signup success:", res.data);
    },
  });
};

/* ---------------- LOGIN ---------------- */
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post("/auth/login", data),

    onSuccess: (res) => {
      console.log("Login success:", res.data);
    },
  });
};

/* ---------------- CURRENT USER ---------------- */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
  });
};
