import {format} from 'date-fns';
import prismadb from "@/lib/prismadb";


import { ColorColumn } from './components/columns';
import ColorClient from './components/ColorClient';


export default async function ColorPages({
  params
} : {
  params : {
    storeId : string
  }
}) {
  const colors = await prismadb.color.findMany(
    {
      where : {
        storeId : params.storeId
      }
    }
  );

 const formatedColors : ColorColumn[] = colors.map(item => ({
  id : item.id,
  name : item.name,
  value : item.value,
  createdAt : format(item.createdAt, "MMMM do, yyyy")
 }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formatedColors}/>
      </div>
    </div>
  )
}
