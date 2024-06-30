"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { deleteFiles } from "@/actions/mutations/delete-file";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";

interface FileUploadProps {
  onChange: (url?: any[]) => void;
  value?: any[] | null;
  endpoint: "imageUploader" | "labelFile";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint = "imageUploader",
}: FileUploadProps) => {
  const { type } = useModal();

  const { mutate } = useMutation({
    mutationFn: () =>
      //@ts-ignore
      deleteFiles(value),
    onSuccess() {
      onChange([]);
    },
    onError() {
      toast.error("Something went wrong, try again.");
    },
    onMutate() {
      toast.loading("removing...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  if (value?.length && endpoint === "imageUploader") {
    return (
      <div className="space-y-2 relative">
        <Image
          alt="image"
          src={value[0].url || ""}
          height={500}
          width={500}
          className="rounded-lg object-cover"
        />
        {value.length > 1 && (
          <div className="flex items-center gap-2">
            {value.slice(1)?.map((value: any) => (
              <Image
                key={value.key}
                alt="image"
                src={value.url || ""}
                height={70}
                width={70}
                className="rounded-lg w-20 h-20 object-cover"
              />
            ))}
          </div>
        )}
        <XIcon
          className="h-8 w-8 text-black cursor-pointer absolute top-2 right-5"
          onClick={() => (type === "addProduct" ? mutate() : onChange([]))}
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const convertedRes = res.map((res) => ({
          url: res.url,
          key: res.key,
        }));
        onChange(convertedRes);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
