import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.signup, // ✅ connected to auth file

    onSuccess: () => {
      alert("Signup successful");
      navigate("/dashboard");
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      return alert(validationError);
    }

    // ✅ THIS is now properly connected to authApi.signup
    mutate({
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
  };

  const inputClass =
    "w-full p-2 rounded border border-gray-600 bg-green-700 text-white placeholder-white";

  return (
    <div className="max-w-md mx-auto mt-10 text-white p-6 shadow-lg rounded-2xl bg-green-800">
      <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>

      {error && <p className="text-red-500">{error.message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className={inputClass}
        />

        {/* 🔥 SUBMIT BUTTON NOW FULLY CONNECTED */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-700 hover:bg-green-900 text-white p-2 rounded"
        >
          {isPending ? "Creating account..." : "Signup"}
        </button>
      </form>

      <button
        onClick={() => navigate("/login")}
        className="mt-4 w-full border bg-green-700 p-2 rounded hover:bg-green-900"
      >
        Already have an account? Login
      </button>
    </div>
  );
}
