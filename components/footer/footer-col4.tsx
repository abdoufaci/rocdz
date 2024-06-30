import Image from "next/image";
import Link from "next/link";

function FooterCol4() {
  return (
    <div className="space-y-3">
      <h1 className="uppercase text-white text-xl">fOLLOW US</h1>
      <div className="flex items-center gap-4">
        <Link
          target="_blank"
          href={"https://www.instagram.com/republicofcomputerdz/"}>
          <Image alt="tiktok" src={"/tiktok.svg"} height={30} width={30} />
        </Link>
        <Link
          target="_blank"
          href={"https://www.instagram.com/republicofcomputerdz/"}>
          <Image
            alt="instagram"
            src={"/instagram.svg"}
            height={30}
            width={30}
          />
        </Link>
      </div>
    </div>
  );
}

export default FooterCol4;
