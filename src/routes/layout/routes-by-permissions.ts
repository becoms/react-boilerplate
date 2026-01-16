import {
  SquareStackIcon,
  LucideProps,
  Home,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavigationRoute = {
  label: string;
  to: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export const userRoutes: NavigationRoute[] = [
  {
    label: "Home",
    to: "/",
    icon: Home,
  },
];

export const controlerRoutes: NavigationRoute[] = [
  ...userRoutes,
  {
    label: "Selections",
    to: "/controler/selections",
    icon: SquareStackIcon,
  },
];

export const adminRoutes: NavigationRoute[] = [...controlerRoutes];

