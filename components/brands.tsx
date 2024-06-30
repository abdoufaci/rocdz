"use client";

import { brands } from "@/brands";
import Image from "next/image";
import Link from "next/link";

function Brands() {
  return (
    <div className="space-y-10 mt-20 w-full">
      <h1 className="text-2xl text-center uppercase font-medium">
        Choose your dream laptop brand
      </h1>
      <div className="flex flex-wrap gap-10 max-lg:justify-center lg:gap-0 justify-between items-center">
        {brands.map((brand) => (
          <Link key={brand.key} href={`/laptops?brand=${brand.key}`}>
            <Image
              key={brand.key}
              src={brand.src}
              alt="laptop brand"
              height={
                brand.src === "/hp.png" || brand.src === "/dell.png" ? 65 : 130
              }
              width={
                brand.src === "/hp.png" || brand.src === "/dell.png" ? 65 : 130
              }
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Brands;
