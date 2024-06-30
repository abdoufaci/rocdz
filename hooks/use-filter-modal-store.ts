import { create } from "zustand";

export interface ModalProductData {
  searchTerm?: string;
  status?: string;
  brand?: string;
  price?: {
    min: number;
    max: number;
  };
}

export interface ModalOrderData {
  status?: string;
  timeline?: {
    from?: Date;
    to?: Date;
  };
  searchTerm?: string;
}

export interface ModalDashboardData {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export interface ModalClientdData {
  brands?: string[];
  searchTerm?: string;
  price?: {
    min: number;
    max: number;
  };
}

interface ModalStore {
  onSearch: (
    productData?: ModalProductData,
    orderData?: ModalOrderData,
    dashboardData?: ModalDashboardData,
    clientData?: ModalClientdData
  ) => void;
  productData: ModalProductData;
  orderData: ModalOrderData;
  dashboardData: ModalDashboardData;
  clientData: ModalClientdData;
}

export const useFilterModal = create<ModalStore>((set) => ({
  productData: {},
  orderData: {},
  dashboardData: {},
  clientData: {
    brands: [],
    searchTerm: "",
  },
  onSearch: (productData, orderData, dashboardData, clientData) =>
    set({ productData, orderData, dashboardData, clientData }),
}));
