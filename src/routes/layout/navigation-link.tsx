import { NavLink, NavLinkProps } from "react-router-dom";

import { NavigationRoute } from "./routes-by-permissions";
import { twMerge } from "tailwind-merge";
import { SidebarMenuButton } from "@/components/sidebar";

const NavigationLink = ({
  to,
  label,
  icon: Icon,
}: Pick<NavLinkProps, "to"> & NavigationRoute) => {
  return (
    <SidebarMenuButton asChild>
      <NavLink
        to={to}
        className={twMerge([
          "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 flex gap-x-3 p-2 leading-4",
        ])}
      >
        {({ isActive }) => (
          <div className="flex items-center gap-2 text-sm">
            {Icon && (
              <Icon
                className={twMerge([
                  "h-5 w-5 shrink-0",
                  isActive ? "text-zinc-900" : "hover:text-zinc-600",
                ])}
                aria-hidden="true"
              />
            )}

            <span>{label}</span>
          </div>
        )}
      </NavLink>
    </SidebarMenuButton>
  );
};

export default NavigationLink;
