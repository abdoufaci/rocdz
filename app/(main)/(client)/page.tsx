import ClientBanner from "./_components/client-banner";
import Brands from "@/components/brands";
import ProductArival from "./_components/product-arival";
import Image from "next/image";
import Map from "./_components/Map";
import Footer from "@/components/footer/footer";
import { Analytics } from "@vercel/analytics/react";

export default async function Home() {
  return (
    <main>
      <ClientBanner />
      <div className="w-[90%] mx-auto mt-10">
        <Brands />
        <ProductArival />
      </div>
      <Image
        alt="bar"
        src={"/home-bar.svg"}
        height={500}
        width={500}
        className="w-full mt-40 max-md:hidden"
      />
      <div className="w-full bg-[#202020]">
        <Image
          alt="bar"
          src={"/small-bar.svg"}
          height={500}
          width={700}
          className="w-[120%] mt-40 md:hidden"
        />
      </div>
      <div className="w-[90%] mx-auto mt-10">
        <Map />
      </div>
      <Analytics />
      <Footer />
    </main>
  );
}
