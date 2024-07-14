import Back from "./_components/back";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";

const CheckoutForm = dynamic(() => import("@/components/forms/chekout-form"), {
  ssr: false,
});

function CheckoutPage() {
  return (
    <div className="w-full mx-auto min-h-screen bg-[#FAFAFA] py-10">
      <div className="w-[90%] mx-auto flex flex-col justify-center items-start gap-7">
        <Back />
        <CheckoutForm />
      </div>
      <Analytics />
    </div>
  );
}

export default CheckoutPage;
