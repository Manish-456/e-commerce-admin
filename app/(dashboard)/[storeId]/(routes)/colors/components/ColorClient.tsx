"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import { ApiList } from "@/components/ui/api-list";

interface ColorClientProps {
  colors : ColorColumn[]
}

export default function ColorClient({
  colors
} : ColorClientProps) {
  const router = useRouter();
  const params = useParams();

  const onRedirect = () => {
    router.push(`/${params.storeId}/colors/new`);
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={onRedirect}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
     <DataTable searchKey="name" columns={columns} data={colors}/>
     <Heading 
     title="API"
     description="API calls for Colors"
     />
     <Separator />
     <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
}
