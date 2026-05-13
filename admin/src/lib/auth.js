import axiosInstance from "./axios";

export const authApi = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    return data;
  },

  signup: async (userData) => {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    return data;
  },

  logout: async () => {
    const { data } = await axiosInstance.post("/auth/logout");
    return data;
  },

  getMe: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },
};

export const loginMutation = () => ({
  mutationFn: authApi.login,
});

export const signupMutation = () => ({
  mutationFn: authApi.signup,
});

export const currentUserQuery = () => ({
  queryKey: ["currentUser"],
  queryFn: authApi.getMe,
  retry: false,
});
