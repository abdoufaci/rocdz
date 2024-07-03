import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import PriceFilter from "./price-filter";

export async function PricePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="bg-transparent border border-[#E7E7E7] rounded text-black font-medium 
               w-44 h-10 px-4 flex items-center justify-between text-sm cursor-pointer">
          <h1>Price</h1>
          <ChevronDown className="h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PriceFilter />
      </PopoverContent>
    </Popover>
  );
}
