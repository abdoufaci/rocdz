import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { QClientProvider } from "@/providers/QueryClientProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <QClientProvider>
            {children}
            <Toaster richColors />
          </QClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
