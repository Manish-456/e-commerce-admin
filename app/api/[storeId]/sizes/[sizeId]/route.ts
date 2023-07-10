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
            sizeId: string
        }
    }
) {
    try {
        
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.sizeId) return new NextResponse("size Id is required", { status: 401 })

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log(`[SIZE.DELETE] `, error);
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
            sizeId: string;
        }
    }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
        if (!userId) return new NextResponse("unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.sizeId) return new NextResponse("Size Id is required", { status: 401 })

        if (!name) return new NextResponse("name is required", { status: 400 })

        if (!value) return new NextResponse("Image Url is required", { status: 400 })
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        if (!storeByUserId) {
            return new NextResponse("unauthorized", { status: 401 })
        }
        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                value,
                name,
            }
        })
        return NextResponse.json(size)

    } catch (error) {
        console.log(`[SIZE  .PATCH] `, error);
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
            sizeId: string
        }
    }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.sizeId) return new NextResponse("size Id is required", { status: 401 })

        await prismadb.size.deleteMany({
            where: {
                storeId: params.storeId,
                id: params.sizeId
            }
        })

        return NextResponse.json({
            message: "size deleted"
        })

    } catch (error) {
        console.log(`[SIZE.DELETE] `, error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}