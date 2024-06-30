import { Button } from "@/components/ui/button";
import ClientHeader from "./_components/client-header";
import ClientBanner from "./_components/client-banner";
import Brands from "@/components/brands";
import ProductArival from "./_components/product-arival";
import Image from "next/image";
import Map from "./_components/Map";
import Footer from "@/components/footer/footer";

export default function Home() {
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
        className="w-full mt-40"
      />
      <div className="w-[90%] mx-auto mt-10">
        <Map />
      </div>
      <Footer />
    </main>
  );
}
