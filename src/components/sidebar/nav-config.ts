import {
  LayoutDashboard,
  BarChart3,
  Package,
  Plus ,
  ShoppingCart,
  Users,
  Settings,
  Store ,
  Search,
} from "lucide-react";

export type UserRole = "ADMIN" | "SHOP_MANAGER" | "COMMON";

export type NavItem = {
  id: string;
  label: string;
  icon: any;
  roles: UserRole[];
  path?: string;
};

export const NAV_MAIN: NavItem[] = [
  {
    id: "home",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["ADMIN", "SHOP_MANAGER"],
    path: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    roles: ["ADMIN"],
    path: "/dashboard/analytics"
  },
  {
    id: "products",
    label: "Add Products",
    icon: Plus ,
    roles: ["ADMIN"],
    path: "/dashboard/addProduct"
  },
  {
    id: "all-products",
    label: "All Products",
    icon: Store  ,
    roles: ["ADMIN"],
    path: "/dashboard/all-products"
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    roles: ["ADMIN"],
    path: "/dashboard/orders"
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    roles: ["SHOP_MANAGER"],
  },
];

export const NAV_SECONDARY: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    roles: ["ADMIN", "SHOP_MANAGER", "COMMON"],
  },
  // {
  //   id: "help",
  //   label: "Help",
  //   icon: HelpCircle,
  //   roles: ["ADMIN", "SHOP_MANAGER", "COMMON"],
  // },
  {
    id: "search",
    label: "Search",
    icon: Search,
    roles: ["ADMIN", "SHOP_MANAGER", "COMMON"],
  },
];