import {format} from 'date-fns';
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import SizeClient from './components/SizeClient';


export default async function SizesPage({
  params
} : {
  params : {
    storeId : string
  }
}) {
  const sizes = await prismadb.size.findMany(
    {
      where : {
        storeId : params.storeId
      }
    }
  );

 const formatedSizes : SizeColumn[] = sizes.map(item => ({
  id : item.id,
  name : item.name,
  value : item.value,
  createdAt : format(item.createdAt, "MMMM do, yyyy")
 }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formatedSizes}/>
      </div>
    </div>
  )
}

