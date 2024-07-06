"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrdersQuery } from "@/hooks/use-query-orders";
import { cn } from "@/lib/utils";
import { useState } from "react";
import OrderStatus from "./order-status";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import Image from "next/image";
import NoResult from "@/components/no-result";
import { useModal } from "@/hooks/use-modal-store";
import { Product } from "@prisma/client";

function OrdersTable() {
  const {
    data: orders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchPreviousPage,
  } = useOrdersQuery();

  const [isFetchingPreviousPage, setIsFetchingPreviousPage] = useState(false);

  const { orderData } = useFilterModal();
  const { onOpen } = useModal();

  let currentOrders = orders;

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      <Table className="w-full relative">
        <TableHeader className=" bg-white">
          <TableRow className="text-[#757575]">
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead className="text-center">OrderID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="">Phone </TableHead>
            <TableHead className="">Wilaya</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>

        {!(
          (orderData?.searchTerm != "" ||
            orderData?.status != "" ||
            (!orderData?.timeline?.from && !orderData?.timeline?.to)) &&
          orders?.pages[0].orders.length === 0
        ) && (
          <TableBody className="bg-white">
            {isFetchingNextPage || isFetchingPreviousPage || isLoading ? (
              <>
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
                <OrdersTable.Skeleton />
              </>
            ) : (
              orders?.pages[orders?.pages?.length - 1].orders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => onOpen("orderDetails", { order })}
                  className="cursor-pointer">
                  <TableCell className="text-gray-sub500 font-semibold whitespace-nowrap space-y-1">
                    {order.products.map((product, idx) => (
                      <h1 key={idx}>{product.name}</h1>
                    ))}
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    {truncate(order.id, 10)}
                  </TableCell>
                  <TableCell className="text-[#757575]">{order.name}</TableCell>
                  <TableCell className="text-[#757575]">
                    {order.phone}
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    {order.wilaya}
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    {order.email}
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    <OrderStatus
                      orderStatus={order.status}
                      orderId={order.id}
                      products={order.products}
                    />{" "}
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    {order?.price} DA
                  </TableCell>
                  <TableCell className="text-[#757575]">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>
      {(((orderData?.searchTerm != "" ||
        orderData?.status != "" ||
        (!orderData?.timeline?.from && !orderData?.timeline?.to)) &&
        orders?.pages[0].orders.length === 0) ||
        orders?.pages[orders.pages.length - 1].orders.length === 0) && (
        <NoResult />
      )}
      <div className="flex items-center justify-end gap-5 w-full mt-3">
        <Button
          className={cn(
            "rounded-md",
            !!currentOrders?.pages.length && currentOrders?.pages.length <= 1
              ? "text-black"
              : "text-white"
          )}
          variant={
            !!currentOrders?.pages.length && currentOrders?.pages.length <= 1
              ? "ghost"
              : "brand"
          }
          disabled={
            !!currentOrders?.pages.length && currentOrders?.pages.length <= 1
          }
          onClick={() => {
            setIsFetchingPreviousPage(true);
            fetchPreviousPage();
            currentOrders?.pages.length &&
              currentOrders?.pages.length > 1 &&
              currentOrders?.pages.pop();
            setIsFetchingPreviousPage(false);
          }}>
          Prev
        </Button>
        <Button
          variant={hasNextPage ? "brand" : "ghost"}
          className={cn(
            "rounded-md",
            hasNextPage ? "text-white" : "text-black"
          )}
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
}

export default OrdersTable;

OrdersTable.Skeleton = function SkeletonOrdersTable() {
  return (
    <TableRow className="text-[#757575]">
      <TableCell className="text-black font-semibold flex items-center space-x-2">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="font-medium text-center">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-28 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-28 h-5" />
      </TableCell>
    </TableRow>
  );
};
