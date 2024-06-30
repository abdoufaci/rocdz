//import { Channel, ChannelType, Server } from "@prisma/client";

import { Order, Prisma, Product, Step } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "inviteMember"
  | "addProduct"
  | "soldProduct"
  | "productDetails"
  | "addOrder"
  | "orderDetails"
  | "productsFilter";

interface ModalData {
  product?: Product | null;
  products?: Product[];
  order?: Order & {
    products: Product[] | null;
    timeline: Step[] | null;
  };
  res?: Prisma.GetProductAggregateType<{
    _max: {
      price: true;
    };
    _min: {
      price: true;
    };
  }>;
  searchParams?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  data: ModalData;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  isSelectedMemberOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
