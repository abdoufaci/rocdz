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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const statusSchema = z.object({
  status: z.string(),
});

function StatusFilter() {
  const { onSearch, productData, dashboardData } = useFilterModal();

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  });

  const selectedStatus = form.watch("status"); // Watch the 'status' field for changes

  useEffect(() => {
    if (selectedStatus) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedStatus, form.handleSubmit]);

  async function onSubmit({ status }: z.infer<typeof statusSchema>) {
    onSearch(
      {
        status,
        searchTerm: productData?.searchTerm || "",
        brand: productData?.brand || "",
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full focus-visible:ring-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
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

export default StatusFilter;
