"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  billboards : BillboardColumn[]
}

export default function BillboardClient({
  billboards
} : BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  const onRedirect = () => {
    router.push(`/${params.storeId}/billboards/new`);
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={onRedirect}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
     <DataTable searchKey="label" columns={columns} data={billboards}/>
     <Heading 
     title="API"
     description="API calls for Billboards"
     />
     <Separator />
     <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
}
