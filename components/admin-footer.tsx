"use client";

import { cn } from "@/lib/utils";
import { Home, LaptopMinimal, ScrollText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminFooter() {
  const pathname = usePathname();

  return (
    <div className="bg-black w-[90%] max-w-[419px] mx-auto hidden max-lg:flex rounded-2xl p-4 pb-0 justify-between items-center gap-5 sticky bottom-5 left-0">
      <Link href={"/dashboard"}>
        <div
          className={cn(
            "space-y-2 w-fit flex flex-col items-center transition-all duration-200 ease-out",
            pathname === "/dashboard"
              ? "text-white"
              : "text-[#535252] hover:text-white"
          )}>
          <div className="flex flex-col items-center gap-1">
            <Home />
            <h1 className="font-light text-sm">Home</h1>
          </div>
          <div
            className={cn(
              "rounded-t-xl  h-1.5 w-16",
              pathname === "/dashboard"
                ? "bg-brand dashboardfootershadow"
                : "bg-transparent"
            )}></div>
        </div>
      </Link>
      <Link href={"/dashboard/orders"}>
        <div
          className={cn(
            "space-y-2 w-fit flex flex-col items-center transition-all duration-200 ease-out",
            pathname === "/dashboard/orders"
              ? "text-white"
              : "text-[#535252] hover:text-white"
          )}>
          <div className="flex flex-col items-center gap-1">
            <ScrollText />
            <h1 className="font-light text-sm">Orders</h1>
          </div>
          <div
            className={cn(
              "rounded-t-xl  h-1.5 w-16",
              pathname === "/dashboard/orders"
                ? "bg-brand dashboardfootershadow"
                : "bg-transparent"
            )}></div>
        </div>
      </Link>
      <Link href={"/dashboard/products"}>
        <div
          className={cn(
            "space-y-2 w-fit flex flex-col items-center transition-all duration-200 ease-out",
            pathname === "/dashboard/products"
              ? "text-white"
              : "text-[#535252] hover:text-white"
          )}>
          <div className="flex flex-col items-center gap-1">
            <LaptopMinimal />
            <h1 className="font-light text-sm">Products</h1>
          </div>
          <div
            className={cn(
              "rounded-t-xl  h-1.5 w-16",
              pathname === "/dashboard/products"
                ? "bg-brand dashboardfootershadow"
                : "bg-transparent"
            )}></div>
        </div>
      </Link>
    </div>
  );
}

export default AdminFooter;
