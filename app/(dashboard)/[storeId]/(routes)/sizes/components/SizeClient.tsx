"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
  sizes : SizeColumn[]
}

export default function SizeClient({
  sizes
} : SizeClientProps) {
  const router = useRouter();
  const params = useParams();

  const onRedirect = () => {
    router.push(`/${params.storeId}/sizes/new`);
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={onRedirect}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
     <DataTable searchKey="name" columns={columns} data={sizes}/>
     <Heading 
     title="API"
     description="API calls for Sizes"
     />
     <Separator />
     <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
}
