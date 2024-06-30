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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { wilayas } from "@/wilayas";
import { Order, Prisma, Product, Step } from "@prisma/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import OrderStatus from "@/app/(main)/(admin)/dashboard/orders/_components/order-status";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Products } from "@/app/(main)/(admin)/dashboard/orders/_components/Products";
import { CircleFadingPlus, XCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { UpdateOrder } from "@/actions/mutations/order-actions/update-order";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";
import { useOrdersQuery } from "@/hooks/use-query-orders";

interface OrderDetailsFormProps {
  order?: Order & {
    products: Product[] | null;
    timeline: Step[] | null;
  };
  close: () => void;
}

export const OrderDetailsSchema = z.object({
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

function OrderDetailsForm({ order, close }: OrderDetailsFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editWilaya, setEditWilaya] = useState(false);
  const [editAdress, setEditAdress] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const { refetch } = useOrdersQuery();

  const form = useForm<z.infer<typeof OrderDetailsSchema>>({
    resolver: zodResolver(OrderDetailsSchema),
    defaultValues: {
      details: order?.details ?? undefined,
      email: order?.email,
      name: order?.name,
      phone: order?.phone,
      wilaya: order?.wilaya,
      products: order?.products ?? [],
      adress: order?.adress ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      products?: Product[];
      name?: string;
      phone?: string;
      wilaya?: string;
      email?: string;
      adress?: string;
      details?: string | undefined;
    }) => UpdateOrder(data, order?.products, order?.id),
    onSuccess() {
      refetch();
      toast.success("Order updated successfuly !");
    },
    onError() {
      toast.error("Something went wrong, try again .");
    },
    onSettled() {
      close();
    },
  });

  const selectedWilaya = form.watch("wilaya");
  const selectedProducts = form.watch("products");

  const total = selectedProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const selectedWilayaShippingCost = wilayas.find(
    (wilaya) => selectedWilaya === wilaya.id
  )?.shippingCost;

  const {
    formState: { isDirty },
  } = form;

  async function onSubmit(data: z.infer<typeof OrderDetailsSchema>) {
    const currentValues = data;
    const defaultValues = {
      details: order?.details ?? undefined,
      email: order?.email,
      name: order?.name,
      phone: order?.phone,
      wilaya: order?.wilaya,
      products: order?.products ?? [],
      adress: order?.adress ?? "",
    };

    const changedValues: {
      products?: Product[];
      name?: string;
      phone?: string;
      wilaya?: string;
      email?: string;
      adress?: string;
      details?: string | undefined;
    } = Object.keys(currentValues).reduce((acc, key) => {
      //@ts-ignore
      if (currentValues[key] !== defaultValues[key]) {
        //@ts-ignore
        acc[key] = currentValues[key];
      }
      return acc;
    }, {});

    const changedProducts = changedValues?.products?.map(
      (product) => product.id
    );

    const defaultProducts = defaultValues?.products?.map(
      (product) => product.id
    );

    const productCompare =
      changedProducts?.toString() === defaultProducts?.toString();

    if (productCompare) {
      delete changedValues?.products;
    }

    const convertedData: {
      products?: Product[];
      name?: string;
      phone?: string;
      wilaya?: string;
      email?: string;
      adress?: string;
      details?: string | undefined;
      price?: number;
    } =
      changedValues.products || changedValues.wilaya
        ? {
            ...changedValues,
            price: total + selectedWilayaShippingCost,
          }
        : {
            ...changedValues,
          };

    console.log({
      convertedData,
    });

    mutate(convertedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <DialogHeader className="py-3 h-fit m-0">
          <div className="w-full flex items-center justify-between">
            <DialogTitle className="text-xl text-[#303030] text-left">
              Order Details
            </DialogTitle>
            {isEditing ? (
              <div className="flex  items-center gap-5">
                <Button
                  onClick={() => {
                    form.reset();
                    setEditName(false);
                    setEditDetails(false);
                    setEditPhone(false);
                    setEditWilaya(false);
                    setEditAdress(false);
                    setEditEmail(false);
                    setIsEditing(false);
                  }}
                  className="bg-transparent border rounded-full border-black text-black font-medium md:text-lg hover:bg-black 
              hover:text-white text-sm md:w-28 "
                  type="button"
                  size={"sm"}>
                  Cancel
                </Button>
                <Button
                  disabled={!isDirty || isPending}
                  type={"submit"}
                  variant={isDirty ? "brand" : "notActive"}
                  className="font-medium text-sm md:text-lg rounded-full w-32 md:w-44 ">
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-full w-32"
                variant={"brand"}>
                Edit Order
              </Button>
            )}
          </div>
          <Separator />
        </DialogHeader>
        <ScrollArea className="h-[550px]">
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <div className="">
                <h1 className="text-[#7A7A7A]">Order ID</h1>
                <h1 className="font-semibold">{order?.id}</h1>
              </div>
              <OrderStatus
                orderId={order?.id ?? ""}
                orderStatus={order?.status ?? "NOTCONFIRMED"}
                products={order?.products}
              />
            </div>
            <div className="flex max-md:flex-col gap-3 items-start w-full">
              <div className="w-full border-2 border-[#E4E4E4] p-4 rounded-3xl space-y-5 h-[250px]">
                <h1 className="text-[#7A7A7A] text-xs">Timline</h1>
                <ScrollArea className="h-[90%]">
                  <div className="space-y-3">
                    {order?.timeline?.map((step, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-center gap-7",
                          idx === 0 ? "" : "text-[#C7C5C5]"
                        )}>
                        <div className="text-xs">
                          <h1>
                            {step.createdAt.getDate()}{" "}
                            {step.createdAt.toLocaleString("en-US", {
                              month: "short",
                            })}
                          </h1>
                          <h1>
                            {step.createdAt
                              .getHours()
                              .toString()
                              .padStart(2, "0")}{" "}
                            :{" "}
                            {step.createdAt
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}
                          </h1>
                        </div>
                        <h1 className="text-[13px]">{step.title}</h1>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="w-full flex-grow border-2 border-[#E4E4E4] p-4 rounded-3xl space-y-5">
                <h1 className="text-[#7A7A7A] text-xs">Client Details</h1>
                <div className="space-y-2 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start space-y-1">
                          <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                            Recipient
                          </FormLabel>
                          <FormControl>
                            {editName && isEditing ? (
                              <Input
                                {...field}
                                className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
                              />
                            ) : (
                              <h1
                                onClick={() => isEditing && setEditName(true)}
                                className={cn(
                                  "text-sm font-semibold",
                                  isEditing && "cursor-pointer"
                                )}>
                                {field?.value}
                              </h1>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wilaya"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start space-y-1">
                          <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                            Wilaya
                          </FormLabel>
                          {editWilaya && isEditing ? (
                            <Select
                              defaultValue={field?.value}
                              onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="ring-0 ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {wilayas.map((wilaya) => (
                                    <SelectItem
                                      key={wilaya.id}
                                      value={wilaya.id}>
                                      {wilaya.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          ) : (
                            <h1
                              onClick={() => isEditing && setEditWilaya(true)}
                              className={cn(
                                "text-sm font-semibold",
                                isEditing && "cursor-pointer"
                              )}>
                              {field?.value}
                            </h1>
                          )}

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start space-y-1">
                          <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                            Phone
                          </FormLabel>
                          <FormControl>
                            {editPhone && isEditing ? (
                              <Input
                                {...field}
                                className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
                              />
                            ) : (
                              <h1
                                onClick={() => isEditing && setEditPhone(true)}
                                className={cn(
                                  "text-sm font-semibold",
                                  isEditing && "cursor-pointer"
                                )}>
                                {field?.value}
                              </h1>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start space-y-1">
                          <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            {editEmail && isEditing ? (
                              <Input
                                {...field}
                                className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
                              />
                            ) : (
                              <h1
                                onClick={() => isEditing && setEditEmail(true)}
                                className={cn(
                                  "text-sm font-semibold",
                                  isEditing && "cursor-pointer"
                                )}>
                                {field?.value}
                              </h1>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="adress"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start space-y-1">
                        <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                          Delivery Address
                        </FormLabel>
                        <FormControl>
                          {editAdress && isEditing ? (
                            <Input
                              {...field}
                              className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] "
                            />
                          ) : (
                            <h1
                              onClick={() => isEditing && setEditAdress(true)}
                              className={cn(
                                "text-sm font-semibold",
                                isEditing && "cursor-pointer"
                              )}>
                              {field?.value}
                            </h1>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start space-y-1">
                        <FormLabel className="whitespace-nowrap text-[#8F8F8F] text-xs font-medium">
                          Details
                        </FormLabel>
                        <FormControl>
                          {editDetails && isEditing ? (
                            <Textarea
                              {...field}
                              className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-full max-w-[590px] h-[103px] rounded-lg resize-none "
                            />
                          ) : (
                            <h1
                              onClick={() => isEditing && setEditDetails(true)}
                              className={cn(
                                "text-sm font-semibold",
                                isEditing && "cursor-pointer"
                              )}>
                              {field?.value}
                            </h1>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
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
                    {isEditing && (
                      <CircleFadingPlus
                        color="#FCC907"
                        strokeWidth={1.25}
                        style={{
                          backgroundColor: "#F8F5E7",
                        }}
                        className="rounded-full cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      />
                    )}
                  </div>
                  <FormControl className="">
                    <Products
                      isModalOpen={isModalOpen}
                      field={field}
                      form={form}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {field.value.map((filedProduct: Product, idx) => {
                      const productImages =
                        filedProduct?.images as Prisma.JsonArray;
                      return (
                        <div
                          key={idx}
                          className="w-full relative flex items-center justify-between rounded-3xl border-2 border-[#E4E4E4] p-2">
                          <div className="flex max-md:flex-col md:items-center gap-4">
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
                          {isEditing && (
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
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex-grow border-2 border-[#E4E4E4] rounded-3xl space-y-5">
              <div className="p-4 space-y-5">
                <h1 className="text-lg font-semibold">Order Summary</h1>
                <div className="space-y-2">
                  {form.getValues().products.map((product: Product, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm">
                      <h1 className="text-[#191919]">{product.name}</h1>
                      <h1>DA {product.price}</h1>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm">
                    <h1 className="text-[#191919]">Shipping</h1>
                    <h1>DA {selectedWilayaShippingCost}</h1>
                  </div>
                </div>
              </div>
              <div className="w-full p-3 rounded-b-[22px] bg-[#E4E4E4] font-semibold flex items-center justify-between">
                <h1>Total</h1>
                <h1>DA {total + selectedWilayaShippingCost}</h1>
              </div>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}

export default OrderDetailsForm;
