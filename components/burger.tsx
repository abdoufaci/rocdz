"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowLeft, Menu } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import Image from "next/image";
import { usePathname } from "next/navigation";

const myFont = localFont({
  src: "../public/fonts/ROGLyonsTypeRegular3.ttf",
  variable: "--font-rog",
});

export function Burger() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-black border-black">
        <SheetHeader className="flex flex-row items-end gap-4">
          <SheetClose>
            <ArrowLeft className="text-white h-7 w-7 cursor-pointer" />
          </SheetClose>
          <Link href={"/"}>
            <Image alt="logo" src="/white-logo.png" height={70} width={150} />
          </Link>
        </SheetHeader>
        <div className="bg-black text-white mt-10">
          <NavigationMenu className="">
            <NavigationMenuItem
              className={cn(
                "flex flex-col gap-5 list-none font-rog",
                myFont.variable
              )}>
              <Link href="/laptops">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white/90 hover:bg-white/10 hover:text-white",
                    pathname === "/laptops" && "text-brand"
                  )}>
                  Laptops
                </NavigationMenuLink>
              </Link>
              <Link href="/about">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white/90 hover:bg-white/10 hover:text-white",
                    pathname === "/about" && "text-brand"
                  )}>
                  About
                </NavigationMenuLink>
              </Link>
              <Link href="/contact">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white/90 hover:bg-white/10 hover:text-white",
                    pathname === "/contact" && "text-brand"
                  )}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
}
