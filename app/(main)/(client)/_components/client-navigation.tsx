"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ClientNavigation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationMenu className="rounded-full hidden md:block">
      <NavigationMenuItem className="list-none">
        <Link href="/laptops">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-white/90 hover:bg-white/10 hover:text-white"
            )}>
            Laptops
          </NavigationMenuLink>
        </Link>
        <Link href="/about">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-white/90 hover:bg-white/10 hover:text-white"
            )}>
            About
          </NavigationMenuLink>
        </Link>
        <Link href="/contact">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-white/90 hover:bg-white/10 hover:text-white"
            )}>
            Contact Us
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default ClientNavigation;
