"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";

interface OrderClientProps {
  orders: OrderColumn[];
}

export default function OrderClient({ orders }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={orders} />
    </>
  );
}
