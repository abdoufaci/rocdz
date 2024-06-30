import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Truck } from "lucide-react";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../../public/fonts/ROGLyonsTypeRegular3.ttf",
  variable: "--font-rog",
});

function ClientBanner() {
  return (
    <div className="bg-black w-full min-h-[calc(100vh-80px)] flex max-xl:flex-col flow-row items-center justify-between overflow-hidden pb-10 xl:pb-0">
      <Image
        alt="laptops"
        src={"/small-banner.png"}
        height={100}
        width={300}
        className="w-full h-[380px] object-cover xl:hidden"
      />
      <div className="pl-5 pt-10 xl:pt-0 xl:pl-20 space-y-7">
        <div
          className={cn(
            "font-rog flex flex-col max-xl:items-center max-xl:justify-center text-6xl md:text-7xl text-white -space-y-10 md:-space-y-16 font-semibold",
            myFont.variable
          )}>
          <h1 className="text-brand text-4xl md:text-5xl">ROCDZ</h1>
          <br />
          <h1>BEST</h1>
          <br />
          <h1>LAPTOPS</h1>
          <br />
          <h1>PRICES</h1>
        </div>
        <div className="text-white flex flex-col max-xl:items-center max-xl:justify-center gap-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm md:text-base font-medium">
              <Truck className="text-brand " />
              <h1>58 Wilaya</h1>
            </div>
            <div className="flex items-center xl:hidden gap-2 text-sm md:text-base font-medium">
              <MapPin className="text-brand " />
              <h1>Bab ezzouar</h1>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm md:text-base font-medium">
              <Calendar className="text-brand " />
              <h1>6/7 Days</h1>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base font-medium">
              <Clock className="text-brand " />
              <h1>9h -19h</h1>
            </div>
          </div>
          <div className="xl:flex items-center hidden gap-2 text-sm md:text-base font-medium">
            <MapPin className="text-brand " />
            <h1>Bab ezzouar</h1>
          </div>
        </div>
      </div>
      <Image
        alt="laptops"
        src={"/home-banner.png"}
        height={500}
        width={500}
        className=" h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full xl:w-[60%] hidden xl:block"
      />
    </div>
  );
}

export default ClientBanner;
