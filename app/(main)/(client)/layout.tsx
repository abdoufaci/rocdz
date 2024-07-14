import { Metadata } from "next";
import ClientHeader from "./_components/client-header";

export const metadata: Metadata = {
  title: "ROCDZ",
  description: "Laptops for every Budget",
  icons: [
    {
      url: "/icon.svg",
      href: "/icon.svg",
    },
  ],
};

function ClientMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ClientHeader />
      <div>{children}</div>
    </main>
  );
}

export default ClientMainLayout;
