import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params
    }: {
        params: {
            storeId: string,
            productId: string
        }
    }
) {
    try {

        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.productId) return new NextResponse("Product Id is required", { status: 401 })

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
                
            },
            include: {
                category: true,
                images: true,
                size: true,
                color: true
            }
        })

        return NextResponse.json(product);

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    {
        params
    }: {
        params: {
            storeId: string;
            productId: string;
        }
    }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            name,
            price,
            categoryId,
            images,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
        } = body;
        if (!userId) return new NextResponse("unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.productId) return new NextResponse("Product Id is required", { status: 401 })

        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!price) return new NextResponse("price is required", { status: 400 })
        if (!categoryId) return new NextResponse("CategoryId is required", { status: 400 })
        if (!colorId) return new NextResponse("Color Id is required", { status: 400 })
        if (!sizeId) return new NextResponse("Size Id is required", { status: 400 })
        if (!images || !images.length) return new NextResponse("Images are required", { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        if (!storeByUserId) {
            return new NextResponse("unauthorized", { status: 401 })
        }
         await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images : {
                    deleteMany : {}
                },
                isFeatured,
                isArchived
            }
        })
        const product = await prismadb.product.update({
            where : {
                id : params.productId
            },
            data : {
                images : {
                    createMany : {
                        data : [
                            ...images.map((image : {url : string}) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)

    } catch (error) {

        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    {
        params
    }: {
        params: {
            storeId: string,
            productId: string
        }
    }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.productId) return new NextResponse("Product Id is required", { status: 401 })

        await prismadb.product.deleteMany({
            where: {
                storeId: params.storeId,
                id: params.productId
            }
        })

        return NextResponse.json({
            message: "product deleted"
        })

    } catch (error) {

        return new NextResponse("Internal Error", { status: 500 })
    }
}