import AdminFooter from "@/components/admin-footer";
import Header from "./_components/header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F6F6F6] w-full space-y-10 min-h-screen relative">
      <Header />
      <div className="w-[90%] h-full mx-auto">{children}</div>
      <AdminFooter />
    </div>
  );
}

export default DashboardLayout;
