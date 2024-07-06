import { DollarSign } from "lucide-react";

interface RevenueProps {
  revenue?: number | null;
}

function Revenue({ revenue }: RevenueProps) {
  const formatedRevenue = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "DZD",
  }).format(revenue ?? 0);

  return (
    <div className="w-full rounded-2xl shadow-md shadow-black/5 bg-brand h-[150px] p-3 relative overflow-hidden text-[#191919]">
      <div className="w-72 h-72 rounded-full bg-white/10 absolute z-10 -top-20 left-[50%] transform translate-x-[-50%] "></div>
      <div className="w-44 h-44 rounded-full bg-white/10 absolute z-10 -top-[50%] left-[0%] transform translate-x-[-50%]  "></div>
      <div className="flex items-center text-xs font-semibold gap-1 z-50">
        <DollarSign className="h-3.5 w-3.5 z-50" />
        <h1 className="z-50">Revenue</h1>
      </div>
      <div className="flex h-[80%] items-center justify-center text-3xl sm:text-4xl font-semibold z-50">
        <h1 className="z-50">{formatedRevenue}</h1>
      </div>
    </div>
  );
}

export default Revenue;
