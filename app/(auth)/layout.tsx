import { Metadata } from "next";

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

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
