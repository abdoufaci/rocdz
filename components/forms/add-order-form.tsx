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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FileUpload } from "../FileUpload";
import { AddProduct } from "@/actions/mutations/product-actions/add-product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";
import { wilayas } from "@/wilayas";
import {
  AddOrder,
  AddOrderProps,
} from "@/actions/mutations/order-actions/add-order";
import { useOrdersQuery } from "@/hooks/use-query-orders";
import { fetchAllProducts } from "@/hooks/use-fetch-products";
import { CircleFadingPlus, XCircle } from "lucide-react";
import { useState } from "react";
import { Products } from "@/app/(main)/(admin)/dashboard/orders/_components/Products";
import { Prisma, Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AddOrderSchema = z.object({
  products: z
    .array(z.any())
    .nonempty({ message: "you have to select one product at least " }),
  name: z.string(),
  phone: z.string(),
  wilaya: z.string(),
  email: z.string(),
  details: z.string().optional(),
  adress: z.string(),
});

function AddOrderForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof AddOrderSchema>>({
    resolver: zodResolver(AddOrderSchema),
    defaultValues: {
      products: [],
    },
  });

  const { onClose } = useModal();

  const { data: products } = fetchAllProducts();

  const { refetch } = useOrdersQuery();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      name: string;
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
      price: number;
      products: Product[];
    }) => AddOrder(data),
    onSuccess(data) {
      toast.success("order added !");
      refetch();
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  async function onSubmit(data: z.infer<typeof AddOrderSchema>) {
    const selectedWilaya = wilayas.find((wilaya) => wilaya.id === data.wilaya);

    const total = data.products.reduce(
      (acc, product: Product) => acc + product.price,
      0
    );

    if (!data.details) {
      delete data.details;
    }
    const convertedData: {
      name: string;
      phone: string;
      wilaya: string;
      email: string;
      adress: string;
      details?: string | undefined;
      price: number;
      products: Product[];
    } = {
      ...data,
      price: total + selectedWilaya?.shippingCost,
    };

    mutate(convertedData);
  }

  return (
    <Form {...form}>
      <div className="flex items-start justify-between">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-[200px] md:w-[275px]"
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
                      className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-[200px] md:w-[275px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Wilaya
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
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
              name="adress"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Adress
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-[200px] md:w-[275px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-[200px] md:w-[275px]"
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
                  Details
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
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-5">
                <div className="flex items-center gap-4">
                  <FormLabel className="whitespace-nowrap text-lg font-semibold">
                    Items
                  </FormLabel>
                  {!!field.value.length && (
                    <div className="rounded-full w-6 h-6 text-sm flex items-center justify-center bg-[#E4E4E4]">
                      <h1>{field.value.length}</h1>
                    </div>
                  )}
                  <CircleFadingPlus
                    color="#FCC907"
                    strokeWidth={1.25}
                    style={{
                      backgroundColor: "#F8F5E7",
                    }}
                    className="rounded-full cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
                <FormControl className="">
                  <Products
                    isModalOpen={isModalOpen}
                    field={field}
                    form={form}
                    onClose={() => setIsModalOpen(false)}
                  />
                </FormControl>
                <div className="flex flex-col items-start gap-5 w-full">
                  {field.value.map((filedProduct: Product, idx) => {
                    const productImages =
                      filedProduct?.images as Prisma.JsonArray;
                    return (
                      <div
                        key={idx}
                        className="w-full relative flex items-center justify-between rounded-3xl border-2 border-[#E4E4E4] p-2">
                        <div className="flex items-center gap-4">
                          <div className="relative w-full max-w-[108.5px] min-w-[108.5px] h-[112.9px]">
                            <Image
                              alt="laptop"
                              src={
                                //@ts-ignore
                                productImages[0]?.url ?? ""
                              }
                              height={154}
                              width={148}
                              className="object-cover w-full h-full rounded-3xl"
                            />
                            {filedProduct?.isSold && (
                              <div className="h-full w-full bg-black/75 text-[#ED2024] text-3xl flex items-center justify-center absolute top-0 left-0 font-semibold">
                                <h1>SOLD</h1>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <h1 className="font-semibold">
                              {filedProduct?.name}
                            </h1>
                            <div className="text-[#434343] space-y-1 text-xs">
                              <h3>{filedProduct?.cpu}</h3>
                              <h3>
                                {filedProduct?.ram}/{filedProduct?.storage}{" "}
                              </h3>
                              <h3>{filedProduct?.screen}</h3>
                            </div>
                          </div>
                        </div>
                        <h1 className="p-3 font-semibold">
                          {filedProduct.price} DA
                        </h1>
                        <XCircle
                          onClick={() =>
                            field.onChange(
                              field.value.filter(
                                (currentFiledProduct: Product) =>
                                  currentFiledProduct.id != filedProduct.id
                              )
                            )
                          }
                          className="h-5 w-5 text-[#E70000] cursor-pointer absolute top-3 right-3"
                          strokeWidth={"0.63px"}
                        />
                      </div>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            variant={"brand"}
            className="p-5 px-10 rounded-full">
            Add Order
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default AddOrderForm;
