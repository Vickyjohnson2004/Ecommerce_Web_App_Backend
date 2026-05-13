import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginMutation } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useMutation(loginMutation());

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: async (data) => {
        localStorage.setItem("token", data.token);

        // 🔥 IMPORTANT: refresh user session before redirect logic kicks in
        await queryClient.refetchQueries({ queryKey: ["currentUser"] });
      },
      onError: (err) => {
        console.log("LOGIN ERROR:", err.response?.data);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-500 mb-2">
          {error.response?.data?.error || "Login failed"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white p-2 rounded"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={() => navigate("/signup")}
        className="mt-4 w-full border p-2 rounded hover:bg-gray-100"
      >
        Create an account
      </button>
    </div>
  );
}
