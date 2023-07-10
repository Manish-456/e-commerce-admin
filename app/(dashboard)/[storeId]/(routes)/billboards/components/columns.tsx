"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./Cell-Action";

export type BillboardColumn = {
  id: string;
  label: string;
  date: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
   {
    id : 'actions',
    cell : ({row}) => <CellAction data={row.original} />
   }
];
