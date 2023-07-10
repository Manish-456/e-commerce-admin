import prismadb from "@/lib/prismadb";

export const getStockCount = async(id : string) => {
const stockCount = await prismadb.product.findMany({
    where : {
        storeId : id,
        isArchived : false
    },
    
});
return stockCount;

}