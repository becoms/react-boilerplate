import { useAuth } from "react-oidc-context";
import {
  ChevronsUpDown,
  LogOut,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import {
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  Sidebar,
  SidebarInset,
  useSidebar,
} from "@/components/sidebar";
import NavigationLink from "./navigation-link";
import {
  adminRoutes,
  controlerRoutes,
  userRoutes,
} from "./routes-by-permissions";
import { usePermissions } from "@/auth/permissions.context";
import { Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

const Layout = () => {
  const { isAuthenticated, signoutRedirect, user } = useAuth();
  const { hasPermission, permissions } = usePermissions();
  const routes = !isAuthenticated ? [] : hasPermission("admin")
    ? adminRoutes
    : hasPermission("controler")
    ? controlerRoutes
    : userRoutes;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <CustomSidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavigationLink
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {isAuthenticated && 
            (
              <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage
                        src={user?.profile.picture}
                        alt={user?.profile.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.profile.name}
                      </span>
                      <span className="truncate text-xs">
                        {user?.profile.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.profile.picture}
                          alt={user?.profile.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          <UserIcon />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user?.profile.name}
                        </span>
                        <span className="truncate text-xs">
                          {user?.profile.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    {permissions.map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                      >
                        <ShieldCheckIcon className="size-4" />
                        <span className="truncate font-medium">
                          {permission}
                        </span>
                      </div>
                    ))}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => void signoutRedirect()}>
                    <LogOut />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="px-5 pt-3 @container">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

const CustomSidebarHeader = () => {
  const { open, isMobile } = useSidebar();
  return (
    <SidebarHeader>
      <img
        src={!open || isMobile ? "/logo-vertical.png" : "/logo.png"}
        className="w-10 group-data-[state=expanded]:w-36 group-data-[state=expanded]:py-3 pb-1"
      />
    </SidebarHeader>
  );
};

export default Layout;
