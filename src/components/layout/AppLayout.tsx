import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Scissors,
  Users,
  ShoppingBag,
  BarChart3,
  Menu,
  X,
  DollarSign,
  Calendar,
  Settings,
  HelpCircle,
  Bell,
  UserCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "POS", path: "/pos", icon: <DollarSign className="h-5 w-5" /> },
    {
      name: "Customers",
      path: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Help",
      path: "/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Main navigation items (shown in both sidebar and mobile nav)
  const mainNavItems = navItems.slice(0, 6);

  // Secondary navigation items (only shown in sidebar)
  const secondaryNavItems = navItems.slice(6);

  const isActive = (path: string) => {
    // Special case for products and customers which both use DataManagement component
    if (path === "/products" && location.pathname === "/products") return true;
    if (path === "/customers" && location.pathname === "/customers")
      return true;
    return location.pathname === path;
  };

  const closeSheet = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-barber-dark text-foreground">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-barber-dark-border px-4 md:hidden">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-gold">Barber</span>
            <span className="text-foreground">Admin</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-gold text-black text-xs">
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] bg-barber-dark-card p-0 border-barber-dark-border"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b border-barber-dark-border px-4">
                  <span className="text-xl font-bold">
                    <span className="text-gold">Barber</span>
                    <span className="text-foreground">Admin</span>
                  </span>
                  <Button variant="ghost" size="icon" onClick={closeSheet}>
                    <X className="h-5 w-5 text-foreground" />
                  </Button>
                </div>

                <div className="p-4 border-b border-barber-dark-border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=barber" />
                      <AvatarFallback>BA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Barber Admin</p>
                      <p className="text-xs text-muted-foreground">
                        admin@barbershop.com
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col p-4 overflow-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeSheet}
                      className={`mb-2 flex items-center rounded-md px-3 py-2 transition-colors ${isActive(item.path) ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-barber-dark-muted hover:text-foreground"}`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <aside className="fixed inset-y-0 left-0 w-64 border-r border-barber-dark-border bg-barber-dark-card">
          <div className="flex h-16 items-center justify-center border-b border-barber-dark-border">
            <span className="text-xl font-bold">
              <span className="text-gold">Barber</span>
              <span className="text-foreground">Admin</span>
            </span>
          </div>

          <div className="p-4 border-b border-barber-dark-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=barber" />
                <AvatarFallback>BA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Barber Admin</p>
                <p className="text-xs text-muted-foreground">
                  admin@barbershop.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100%-8rem)] overflow-auto">
            <nav className="mt-4 px-4 flex-1">
              <p className="text-xs uppercase text-muted-foreground mb-2 px-3">
                Main
              </p>
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mb-2 flex items-center rounded-md px-3 py-2 transition-colors ${isActive(item.path) ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-barber-dark-muted hover:text-foreground"}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              <p className="text-xs uppercase text-muted-foreground mt-6 mb-2 px-3">
                System
              </p>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mb-2 flex items-center rounded-md px-3 py-2 transition-colors ${isActive(item.path) ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-barber-dark-muted hover:text-foreground"}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4 border-t border-barber-dark-border">
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-barber-dark md:ml-64">
        <div className="container mx-auto p-4 pb-20 md:pb-4">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-barber-dark-border bg-barber-dark-card md:hidden z-50">
        {mainNavItems.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-1 flex-col items-center justify-center py-2 ${isActive(item.path) ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AppLayout;
