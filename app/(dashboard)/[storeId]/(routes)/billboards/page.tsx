import {format} from 'date-fns';
import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/BillboardClient";
import { BillboardColumn } from "./components/columns";


export default async function Billboards({
  params
} : {
  params : {
    storeId : string
  }
}) {
  const billboards = await prismadb.billboard.findMany(
    {
      where : {
        storeId : params.storeId
      }
    }
  );

 const formattedBillboards : BillboardColumn[] = billboards.map(item => ({
  id : item.id,
  label : item.label,
  date : format(item.createdAt, "MMMM do, yyyy")
 }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards}/>
      </div>
    </div>
  )
}

