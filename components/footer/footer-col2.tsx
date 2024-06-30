import { brands } from "@/product-options";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function FooterCol2() {
  return (
    <div className="space-y-3">
      <h1 className="uppercase text-white text-xl">Brands</h1>
      <div className="space-y-3">
        {brands.map((brand) => (
          <Link key={brand.key} href={`/laptops?brand=${brand.key}`}>
            <h1 key={brand.title} className="text-[#929FA5]">
              {brand.title}
            </h1>
          </Link>
        ))}
      </div>
      <Link
        href={"/laptops"}
        className="flex items-center gap-2 text-brand font-medium">
        <h1>Browse All Product</h1>
        <ArrowRight />
      </Link>
    </div>
  );
}

export default FooterCol2;
