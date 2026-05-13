import { Navigate, Route, Routes } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "./lib/auth";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardLayout from "./layouts/DashboardLayout";

import PageLoader from "./components/PageLoader";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { data: user, isLoading } = useQuery(currentUserQuery());

  if (isLoading) return <PageLoader />;

  const isSignedIn = !!user;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={isSignedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isSignedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={isSignedIn ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
