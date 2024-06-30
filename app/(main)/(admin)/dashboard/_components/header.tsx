import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Navigation from "./Navigation";
import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import Add from "@/components/add";
import DashboardDateFilter from "./dashboard-date-filter";
import Link from "next/link";

async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="w-[90%] mx-auto p-5">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href={"/"}>
            <Image alt="logo" src="/logo.svg" height={70} width={150} />
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center gap-5">
          <DashboardDateFilter />
          <UserButton afterSignOutUrl="/" />
          {currentUser?.role === "MANAGER" && <Add type="inviteMember" />}
        </div>
      </nav>
    </header>
  );
}

export default Header;
