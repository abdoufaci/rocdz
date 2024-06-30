"use client";

import { ModalType, useModal } from "@/hooks/use-modal-store";
import { CircleFadingPlus } from "lucide-react";

interface AddProps {
  type: ModalType;
}

function Add({ type }: AddProps) {
  const { onOpen } = useModal();

  return (
    <CircleFadingPlus
      color="#FCC907"
      strokeWidth={1.25}
      style={{
        backgroundColor: "#F8F5E7",
      }}
      className="rounded-full cursor-pointer"
      onClick={() => onOpen(type)}
    />
  );
}

export default Add;
