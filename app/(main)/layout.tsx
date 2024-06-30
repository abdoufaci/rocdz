import { ModalProvider } from "@/providers/modal-provider";
import React from "react";
import NextTopLoader from "nextjs-toploader";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <NextTopLoader
        color="#FCC907"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #FCC907,0 0 5px #FCC907"
      />
      <ModalProvider />
      <div>{children}</div>
    </main>
  );
}

export default MainLayout;
