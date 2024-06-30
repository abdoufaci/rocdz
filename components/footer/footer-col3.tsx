import { brands } from "@/product-options";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function FooterCol3() {
  return (
    <div className="space-y-3">
      <h1 className="uppercase text-white text-xl">catigories</h1>
      <div className="space-y-3">
        <Link href={"/laptops"}>
          <h1 className="text-[#929FA5]">Laptops</h1>
        </Link>
        <Link href={"/contact"}>
          <h1 className="text-[#929FA5] mt-3">Contact us</h1>
        </Link>
        <Link href={"/about"}>
          <h1 className="text-[#929FA5] mt-3">About Us</h1>
        </Link>
      </div>
    </div>
  );
}

export default FooterCol3;
