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
import { useProductsQuery } from "@/hooks/use-query-products";

export const AddProductSchema = z.object({
  images: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
      })
    )
    .nonempty("one image at least is required ."),
  name: z.string(),
  cpu: z.string(),
  ram: z.string(),
  brand: z.string(),
  screen: z.string(),
  state: z.string(),
  battery: z.string(),
  price: z.string().transform((v) => Number(v) || 0),
  details: z.string(),
  storage: z.string(),
  isNew: z.array(z.string()).optional(),
});

function AddProductForm() {
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      images: [],
      isNew: [],
    },
  });

  const { onClose } = useModal();

  const { refetch } = useProductsQuery();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AddProductSchema>) => AddProduct(data),
    onSuccess(data) {
      toast.success("product added !");
      refetch();
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  async function onSubmit(data: z.infer<typeof AddProductSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <div className="flex items-start justify-between">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-5">
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
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Brand
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {brands.map((brand) => (
                          <SelectItem key={brand.key} value={brand.key}>
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
            <FormField
              control={form.control}
              name="cpu"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    CPU
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
              name="ram"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Ram
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {ram.map((ram) => (
                          <SelectItem
                            key={ram.capacity}
                            value={ram.capacity + "GB"}>
                            {ram.capacity} GB
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
              name="storage"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Storage
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {storages.map((storage) => (
                          <SelectItem
                            key={storage.capacity}
                            value={storage.capacity}>
                            {storage.capacity}
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
              name="screen"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Screen
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
              name="battery"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    Battery
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {battery.map((battery) => (
                          <SelectItem key={battery.key} value={battery.key}>
                            {battery.title}
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
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                    State
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[200px] md:w-[275px] focus-visible:ring-0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {states.map((state) => (
                          <SelectItem key={state.key} value={state.key}>
                            {state.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-2">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-sm font-medium">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="border-gray-sub-300 focus-visible:ring-0 bg-[#F8F8F8] w-[200px] md:w-[275px] 
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none"
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
            name="isNew"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="isNew"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-full data-[state=checked]:bg-brand data-[state=checked]:text-black data-[state=checked]:border-none"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      //@ts-ignore
                                      ...field.value,
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="inline-block md:hidden w-[354px] h-[339px]">
                <FormControl>
                  <div>
                    <FileUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="imageUploader"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            variant={"brand"}
            className="p-5 px-10 rounded-full">
            Add Product
          </Button>
        </form>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="hidden lg:block w-[354px] h-[339px]">
              <FormControl>
                <div>
                  <FileUpload
                    //@ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    endpoint="imageUploader"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}

export default AddProductForm;
