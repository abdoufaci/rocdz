"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { brands } from "@/product-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const brandSchema = z.object({
  brands: z.array(z.string()),
});

interface ClientProductsFilterProps {
  searchParams?: string;
}

function ClientProductsFilter({ searchParams }: ClientProductsFilterProps) {
  const pathname = usePathname();

  const { onSearch, clientData } = useFilterModal();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brands: pathname.startsWith("/laptops")
        ? !!clientData?.brands?.length
          ? clientData.brands
          : searchParams
          ? [searchParams]
          : []
        : [],
    },
  });

  console.log(pathname.startsWith("/laptops"));

  const selectedBrand = form.watch("brands"); // Watch the 'Brand' field for changes

  useEffect(() => {
    if (selectedBrand) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedBrand, form.handleSubmit]);

  async function onSubmit({ brands }: z.infer<typeof brandSchema>) {
    onSearch({}, {}, {}, { brands, searchTerm: clientData?.searchTerm || "" });
  }

  return (
    <Form {...form}>
      <form className="w-full md:w-[180px]">
        <FormField
          control={form.control}
          name="brands"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="whitespace-nowrap text-[#070707] font-semibold text-lg">
                BRANDS
              </FormLabel>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <FormField
                    key={brand.key}
                    control={form.control}
                    name="brands"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={brand.key}
                          className="flex items-center gap-2 !m-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-[2px] border-[#C9CFD2] data-[state=checked]:bg-brand data-[state=checked]:border-none data-[state=checked]:text-black"
                              checked={field.value?.includes(brand.key)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, brand.key])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== brand.key
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-[#434343]">
                            {brand.title}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ClientProductsFilter;
