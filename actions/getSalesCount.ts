import prismadb from "@/lib/prismadb";

export const getSalesCount = async(id : string) => {
const salesCount = await prismadb.order.findMany({
    where : {
        storeId : id,
        isPaid : true
    },
    
});
return salesCount;

}