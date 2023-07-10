import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { OrderColumn } from "./components/columns";
import OrderClient from "./components/OrderClient";
import { formatter } from "@/lib/utils";

export default async function Billboards({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });


  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone : item.phone,
    address: item.address,
    isPaid : item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    date: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formattedOrders} />
      </div>
    </div>
  );
}
