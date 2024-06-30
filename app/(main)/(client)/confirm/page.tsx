import dynamic from "next/dynamic";
import Back from "../checkout/_components/back";

const Details = dynamic(() => import("./_components/details"), {
  ssr: false,
});

function CheckoutPage() {
  return (
    <div className="w-full mx-auto min-h-screen bg-[#FAFAFA] py-10">
      <div className="w-[90%] mx-auto flex flex-col justify-center items-start gap-7">
        <Back />
        <Details />
      </div>
    </div>
  );
}

export default CheckoutPage;
