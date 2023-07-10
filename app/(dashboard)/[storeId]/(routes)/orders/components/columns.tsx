"use client";

import { ColumnDef } from "@tanstack/react-table";


export type OrderColumn = {
  id: string;
  phone : string;
  address : string;
  totalPrice : string;
  products : String;
  isPaid : boolean;
  date: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Product",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "date",
    header: "Date",
  }
 
];
