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

export const DateFilterSchema = z.object({
  timeline: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

function DateFilter() {
  const form = useForm<z.infer<typeof DateFilterSchema>>({
    resolver: zodResolver(DateFilterSchema),
  });

  const { onSearch, orderData } = useFilterModal();

  const selectedTimeLine = form.watch("timeline");

  useEffect(() => {
    if (selectedTimeLine) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedTimeLine, form.handleSubmit]);

  async function onSubmit(data: z.infer<typeof DateFilterSchema>) {
    onSearch({}, { timeline: data.timeline, status: orderData?.status || "" });
  }

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

export default DateFilter;
