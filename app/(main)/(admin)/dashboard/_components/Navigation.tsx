"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Navigation() {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationMenu className="rounded-full hidden lg:block bg-white">
      <NavigationMenuItem className="list-none rounded-full">
        <Link href="/dashboard">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full p-5",
              pathname === "/dashboard" &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}>
            Overview
          </NavigationMenuLink>
        </Link>
        <Link href="/dashboard/orders">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full p-5",
              pathname === "/dashboard/orders" &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}>
            Orders
          </NavigationMenuLink>
        </Link>
        <Link href="/dashboard/products">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full p-5",
              pathname === "/dashboard/products" &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}>
            Products
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default Navigation;
