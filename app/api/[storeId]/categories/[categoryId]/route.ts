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
            categoryId: string
        }
    }
) {
    try {

        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.categoryId) return new NextResponse("Category Id is required", { status: 401 })

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            },
            include: {
                billboard: true
            }
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log(`[CATEGORY.DELETE] `, error);
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
            categoryId: string;
        }
    }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;
        if (!userId) return new NextResponse("unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.categoryId) return new NextResponse("Category Id is required", { status: 401 })

        if (!name) return new NextResponse("Name is required", { status: 400 })

        if (!billboardId) return new NextResponse("Billboard Id is required", { status: 400 })
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        if (!storeByUserId) {
            return new NextResponse("unauthorized", { status: 401 })
        }
        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId,
            }
        })
        return NextResponse.json(category);

    } catch (error) {
        console.log(`[BILLBOARD.PATCH] `, error);
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
            categoryId: string
        }
    }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.categoryId) return new NextResponse("Category Id is required", { status: 401 })

        await prismadb.category.deleteMany({
            where: {
                storeId: params.storeId,
                id: params.categoryId
            }
        })

        return NextResponse.json({
            message: "category deleted"
        })

    } catch (error) {
        console.log(`[BILLBOARD.DELETE] `, error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}