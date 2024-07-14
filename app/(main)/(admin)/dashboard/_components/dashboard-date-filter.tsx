"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/hooks/use-modal-store";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const DashboardDateFilterSchema = z.object({
  timeline: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

function DashboardDateFilter() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const pathname = usePathname();
  const { onSearch, orderData, clientData } = useFilterModal();

  const form = useForm<z.infer<typeof DashboardDateFilterSchema>>({
    resolver: zodResolver(DashboardDateFilterSchema),
    defaultValues: {
      timeline:
        pathname === "/dashboard"
          ? {
              from: firstDay,
              to: lastDay,
            }
          : {},
    },
  });

  useEffect(() => {
    if (pathname === "/dashboard") {
      onSearch(
        {},
        {
          searchTerm: orderData?.searchTerm,
          status: orderData?.status,
          timeline: orderData?.timeline,
        },
        {
          timeline: {
            from: firstDay,
            to: lastDay,
          },
        },
        {
          brands: clientData?.brands,
          price: clientData?.price,
          searchTerm: clientData?.searchTerm,
        }
      );
    }
  }, [pathname]);

  const selectedTimeLine = form.watch("timeline");

  useEffect(() => {
    if (selectedTimeLine) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedTimeLine, form.handleSubmit]);

  async function onSubmit(data: z.infer<typeof DashboardDateFilterSchema>) {
    onSearch(
      {},
      {
        searchTerm: orderData?.searchTerm,
        status: orderData?.status,
        timeline: orderData?.timeline,
      },
      { timeline: data.timeline }
    );
  }

  if (pathname === "/dashboard")
    return (
      <Form {...form}>
        <div className="flex items-start justify-between">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem className="w-full">
                  <DatePickerWithRange field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </div>
      </Form>
    );
}

export default DashboardDateFilter;
