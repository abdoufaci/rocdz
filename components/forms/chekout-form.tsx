"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  battery,
  brands,
  items,
  ram,
  states,
  storages,
} from "@/product-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { wilayas } from "@/wilayas";
import { fetchCart } from "@/hooks/use-fetch-cart";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AddClientDetails } from "@/actions/mutations/cart-actions/add-client-details";
import { toast } from "sonner";

const CartProducts = dynamic(() => import("../cart-products"), {
  ssr: false,
});

export const CheckoutSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  wilaya: z.string(),
  email: z.string(),
  details: z.string().optional(),
  street: z.string(),
});

function CheckoutForm() {
  const router = useRouter();

  const { data: cart, isPending } = fetchCart(true);

  const total = cart?.products.reduce((acc, product) => acc + product.price, 0);

  const res = cart?.name?.split(" ");

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      details: cart?.details ?? undefined,
      email: cart?.email ?? undefined,
      firstName: res?.[0] ?? undefined,
      lastName: res?.[1] ?? undefined,
      phone: cart?.phone ?? undefined,
      street: cart?.adress ?? undefined,
      wilaya: cart?.wilaya ?? undefined,
    },
  });

  useEffect(() => {
    if (cart) {
      if (!!!cart.products.length) {
        redirect("/");
      }
    }
  }, [cart]);

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (data: {
      name: string;
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
      price: number;
    }) => AddClientDetails(data, cart?.id),
    onSuccess() {
      router.push("/confirm");
      toast.success("details added !");
    },
    onError() {
      toast.error("Something went wrong, try again .");
    },
  });

  async function onSubmit(data: z.infer<typeof CheckoutSchema>) {
    const selectedWilaya = wilayas.find((wilaya) => wilaya.id === data.wilaya);

    let convertedData: {
      name: string;
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
      price: number;
    };
    convertedData = {
      phone: data.phone,
      email: data.email,
      adress: data.street,
      wilaya: data.wilaya,
      name: data.firstName + " " + data.lastName,
      details: data.details,
      //@ts-ignore
      price: total + selectedWilaya?.shippingCost,
    };

    mutate(convertedData);
  }

  return (
    <Form {...form}>
      <form
        className="flex max-lg:flex-col flex-row gap-24 justify-center items-start w-full "
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5 p-5 bg-white rounded-sm shadow-md flex-grow">
          <h1 className="text-xl font-semibold">Personal details</h1>
          <div className="flex items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Wilaya
                </FormLabel>
                <Select
                  defaultValue={cart?.wilaya ?? undefined}
                  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full focus-visible:ring-0">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya.id} value={wilaya.id}>
                          {wilaya.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Additional information
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full max-w-[590px] h-[103px] rounded-lg resize-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CartProducts
          //@ts-ignore
          cart={cart}
          total={total}
          isPending={isPending}
          isMutationPending={isMutationPending}
        />
      </form>
    </Form>
  );
}

export default CheckoutForm;
