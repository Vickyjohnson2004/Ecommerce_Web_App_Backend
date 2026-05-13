import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "../lib/auth";

import {
  ClipboardListIcon,
  HomeIcon,
  PanelLeftIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";

// eslint-disable-next-line
export const NAVIGATION = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="size-5" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBagIcon className="size-5" />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ClipboardListIcon className="size-5" />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <UsersIcon className="size-5" />,
  },
];

function Navbar() {
  const location = useLocation();

  // 🔥 get logged-in user from JWT backend
  const { data: user } = useQuery(currentUserQuery());

  return (
    <div className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer"
        className="btn btn-square btn-ghost"
        aria-label="open sidebar"
      >
        <PanelLeftIcon className="size-5" />
      </label>

      <div className="flex-1 px-4">
        <h1 className="text-xl font-bold">
          {NAVIGATION.find((item) => item.path === location.pathname)?.name ||
            "Dashboard"}
        </h1>
      </div>

      <div className="mr-5 flex items-center gap-3">
        <div className="text-sm font-medium">{user?.name || "User"}</div>

        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
          {user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
