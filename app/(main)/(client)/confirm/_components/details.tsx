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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { wilayas } from "@/wilayas";
import { fetchCart } from "@/hooks/use-fetch-cart";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AddClientDetails } from "@/actions/mutations/cart-actions/add-client-details";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartProducts = dynamic(() => import("@/components/cart-products"), {
  ssr: false,
});

function Details() {
  const { data: cart, isPending } = fetchCart(true);

  const total = cart?.products.reduce((acc, product) => acc + product.price, 0);

  useEffect(() => {
    if (cart) {
      if (!!!cart.products.length) {
        redirect("/");
      }
    }
  }, [cart]);

  console.log({
    cart,
  });

  return (
    <div className="flex max-lg:flex-col flex-row gap-24 justify-center items-start w-full">
      <div className="space-y-5 p-5 bg-white rounded-sm shadow-md flex-grow">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Personal details</h1>
          <Button
            className="bg-transparent border rounded-[2px] border-black text-black font-medium hover:bg-black 
              hover:text-white w-24 h-8"
            type="button"
            size={"xl"}>
            <Link href={"/checkout"}>Edit</Link>
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <span className="text-[#5F6C72] font-medium">Name: </span>
            <h1 className="font-semibold">{cart?.name}</h1>
          </div>
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <span className="text-[#5F6C72] font-medium">Wilaya: </span>
            <h1 className="font-semibold">{cart?.wilaya}</h1>
          </div>
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <span className="text-[#5F6C72] font-medium">Address: </span>
            <h1 className="font-semibold">{cart?.adress}</h1>
          </div>
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <span className="text-[#5F6C72] font-medium">Phone: </span>
            <h1 className="font-semibold">{cart?.phone}</h1>
          </div>
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <span className="text-[#5F6C72] font-medium">Email: </span>
            <h1 className="font-semibold">{cart?.email}</h1>
          </div>
          {cart?.details && cart?.details != "" && cart.details != "\n" && (
            <div className="flex items-start space-x-3 text-sm font-semibold">
              <span className="text-[#5F6C72] font-medium">Details: </span>
              <h1 className="font-semibold">{cart?.details}</h1>
            </div>
          )}
        </div>
      </div>
      <CartProducts
        //@ts-ignore
        cart={cart}
        total={total}
        isPending={isPending}
        isMutationPending={false}
      />
    </div>
  );
}

export default Details;
