import { getProductById } from "@/actions/queries/get-product-by-id";
import Product from "./_components/product";
import Map from "../_components/Map";
import Footer from "@/components/footer/footer";

async function page({ params }: { params: { productId: string } }) {
  const product = await getProductById(params.productId);

  return (
    <div className="w-full mx-auto min-h-screen bg-[#FAFAFA] pt-10">
      <div className="w-[90%] mx-auto flex justify-center items-start gap-0 ">
        <Product product={product} />
      </div>
      <Map />
      <Footer />
    </div>
  );
}

export default page;
