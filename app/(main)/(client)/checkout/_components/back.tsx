"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function Back() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-5">
      <ArrowLeft
        onClick={() => router.back()}
        className="h-7 w-7 text-[#3F3F3F] cursor-pointer"
      />
      <div className="text-[#3F3F3F] text-xs flex items-center whitespace-nowrap">
        <h1>Home / Laptops / </h1>{" "}
        <span className="text-black font-semibold"> Checkout</span>{" "}
      </div>
    </div>
  );
}

export default Back;
