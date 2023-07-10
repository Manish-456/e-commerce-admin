import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard, DollarSign, Package } from 'lucide-react'
import { formatter } from '@/lib/utils'
import { getTotalRevenue } from '@/actions/getTotalRevenue'
import { getSalesCount } from '@/actions/getSalesCount'
import { getStockCount } from '@/actions/getStockCount'
import Overview from '@/components/Overview'
import { getGraphRevenue } from '@/actions/getGraphRevenue'


export default async function DashboardPage({
  params
} : {
  params : {
    storeId : string
  }
}) {



  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId)
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title='Dashboard' description='Overview of your store.' />
      <Separator />
     <div className="grid gap-4 grid-cols-3">

      <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-4">
    <CardTitle className='text-sm font-medium'>
    Total Revenue
    </CardTitle>
  <DollarSign className='h-4 w-4 text-muted-foreground'  />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      {formatter.format(totalRevenue)}
    </div>
  </CardContent>
</Card>
      <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-4">
    <CardTitle className='text-sm font-medium'>
   Sales
    </CardTitle>
  <CreditCard className='h-4 w-4 text-muted-foreground'  />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      +{salesCount?.length}
    </div>
  </CardContent>
</Card>
      <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-4">
    <CardTitle className='text-sm font-medium'>
   Product In Stock
    </CardTitle>
  <Package className='h-4 w-4 text-muted-foreground'  />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      {stockCount.length}
    </div>
  </CardContent>
</Card>
     </div>
     <Card className='col-span-4'>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Overview data={graphRevenue}/>
      </CardContent>
     </Card>

      </div>

    </div>
  )
}
