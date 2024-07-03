"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { InviteForm } from "../forms/InviteForm";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const myFont = localFont({
  src: "../../public/fonts/ROGLyonsTypeRegular3.ttf",
  variable: "--font-rog",
});

export const ThankyouModal = () => {
  const { isOpen, onClose, type } = useModal();

  const router = useRouter();

  const isModalOpen = isOpen && type === "thankyou";

  const close = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent className="bg-white text-black rounded-none h-[300px] max-w-3xl">
        <div className="space-y-5">
          <div className="flex items-center justify-center">
            <Image alt="rog" src={"/logo.svg"} height={50} width={130} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <h1
              className={cn(
                "max-[365px]:text-4xl text-5xl md:text-6xl font-rog text-brand",
                myFont.variable
              )}>
              Thank you
            </h1>
            <p className="text-center text-sm">
              Thank you for choosing{" "}
              <span className={cn("font-rog font-semibold", myFont.variable)}>
                {" "}
                ROCDZ!
              </span>{" "}
              We are thrilled <br className="max-sm:hidden" />
              you found the perfect laptop and can not wait to get it to you.
            </p>
          </div>
        </div>
        <DialogFooter className="flex justify-center items-center gap-1 text-sm text-[#6A6A6A]">
          <PhoneCall className="h-4 w-4" />
          <h1>(0541-368-526)</h1>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
