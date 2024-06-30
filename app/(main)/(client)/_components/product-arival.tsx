import { Button } from "@/components/ui/button";
import ProductsFeed from "./products-feed";
import Link from "next/link";

function ProductArival() {
  return (
    <div className="space-y-14 flex flex-col items-center mt-32">
      <h1 className="text-center font-semibold text-4xl">New Arrivals</h1>
      <ProductsFeed />
      <Button
        className="bg-transparent border rounded-none border-black text-black font-medium text-lg hover:bg-black 
              hover:text-white w-44 h-11"
        type="button"
        size={"xl"}>
        <Link href={"/laptops"}>Show More</Link>
      </Button>
    </div>
  );
}

export default ProductArival;
