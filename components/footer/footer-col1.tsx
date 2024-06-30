import Image from "next/image";

function FooterCol1() {
  return (
    <div className="space-y-5">
      <Image alt="rog logo" src={"/white-logo.png"} height={70} width={150} />
      <div className="text-white space-y-2">
        <h1 className="text-[#77878F] text-sm">Customer Supports:</h1>
        <h1 className="text-lg">(213) 555-01-29-52</h1>
        <h1 className="text-[#ADB7BC]">Bab Ezzouar enface USTHB ,Algeria</h1>
        <h1>info@republicofcomputers.com</h1>
      </div>
    </div>
  );
}

export default FooterCol1;
