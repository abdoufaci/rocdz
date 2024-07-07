"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const brandSchema = z.object({
  brand: z.string(),
});

function BrandFilter() {
  const { onSearch, productData, dashboardData } = useFilterModal();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
  });

  const selectedBrand = form.watch("brand"); // Watch the 'Brand' field for changes

  useEffect(() => {
    if (selectedBrand) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedBrand, form.handleSubmit]);

  async function onSubmit({ brand }: z.infer<typeof brandSchema>) {
    onSearch(
      {
        brand,
        searchTerm: productData?.searchTerm || "",
        status: productData?.status || "",
        price: productData?.price,
      },
      {},
      {
        timeline: dashboardData?.timeline,
      }
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-14 w-full md:w-[180px]">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full focus-visible:ring-0">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"all"}>All</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem value={brand.key} key={brand.key}>
                        {brand.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default BrandFilter;
