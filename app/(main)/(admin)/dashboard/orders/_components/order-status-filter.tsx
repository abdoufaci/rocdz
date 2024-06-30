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
import { OrderStatus } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const brandSchema = z.object({
  status: z.string(),
});

function OrderStatusFilter() {
  const { onSearch, orderData } = useFilterModal();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
  });

  const selectedStatus = form.watch("status"); // Watch the 'Brand' field for changes

  useEffect(() => {
    if (selectedStatus) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedStatus, form.handleSubmit]);

  async function onSubmit({ status }: z.infer<typeof brandSchema>) {
    onSearch({}, { timeline: orderData?.timeline || {}, status });
  }

  return (
    <Form {...form}>
      <form className="space-y-14 w-[180px]">
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
                    <SelectItem value={"all"}>All</SelectItem>
                    <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                    <SelectItem value={OrderStatus.CANCELED}>
                      Canceled
                    </SelectItem>
                    <SelectItem value={OrderStatus.DELIVERING}>
                      Delivering
                    </SelectItem>
                    <SelectItem value={OrderStatus.NOTCONFIRMED}>
                      Not Confirmed
                    </SelectItem>
                    <SelectItem value={OrderStatus.CONFIRMED}>
                      Confirmed
                    </SelectItem>
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

export default OrderStatusFilter;
