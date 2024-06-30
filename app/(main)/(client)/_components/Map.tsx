import { Clock, MapPin, Truck } from "lucide-react";

function Map() {
  return (
    <div className="mt-32 flex flex-wrap items-center justify-center gap-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.2152116706616!2d3.1843482752990435!3d36.71739227236393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e51460f208447%3A0x721e027c34b6a0cf!2sROCDZ%20(%20Republic%20Of%20Computer%20Dz%20)!5e0!3m2!1sen!2sdz!4v1719079684958!5m2!1sen!2sdz"
        width="600"
        height="450"
        style={{
          border: "0px",
        }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="space-y-5">
        <div className="border border-black/25 p-5 space-y-4 w-[357.87px]">
          <div className="flex items-center gap-2 font-semibold text-[#252525]">
            <MapPin className="h-5 w-5" />
            <h1>ADDRESS</h1>
          </div>
          <h1 className="text-[#787878] text-sm font-medium">
            Bab Ezzouar enface USTHB
          </h1>
        </div>
        <div className="border border-black/25 p-5 space-y-4 w-[357.87px]">
          <div className="flex items-center gap-2 font-semibold text-[#252525]">
            <Clock className="h-5 w-5" />
            <h1>WORKING DAYS</h1>
          </div>
          <div className="space-y-2 font-medium">
            <h1 className="text-[#787878] text-sm">Saturday-Thusday </h1>
            <h1 className="text-[#787878] text-sm">9h-19h </h1>
          </div>
        </div>
        <div className="border border-black/25 p-5 space-y-4 w-[357.87px]">
          <div className="flex items-center gap-2 font-semibold text-[#252525]">
            <Truck className="h-5 w-5" />
            <h1>DELIVERY</h1>
          </div>
          <h1 className="text-[#787878] text-sm font-medium">58 Wilayas</h1>
        </div>
      </div>
    </div>
  );
}

export default Map;
