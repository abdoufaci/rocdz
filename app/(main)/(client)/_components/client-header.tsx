import Image from "next/image";
import ClientNavigation from "./client-navigation";
import Link from "next/link";
import { Burger } from "@/components/burger";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./cart"), {
  ssr: false,
});

function ClientHeader() {
  return (
    <header className="bg-black p-5 text-white h-20 sticky top-0 left-0 z-50">
      <nav className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href={"/"}>
            <Image alt="logo" src="/white-logo.png" height={70} width={150} />
          </Link>
        </div>
        <div className="flex items-center gap-7 md:gap-20">
          <ClientNavigation />
          <Cart />
          <div className="md:hidden">
            <Burger />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default ClientHeader;
