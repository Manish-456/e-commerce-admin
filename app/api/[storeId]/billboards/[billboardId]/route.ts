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
            billboardId: string
        }
    }
) {
    try {
        
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.billboardId) return new NextResponse("Billboard Id is required", { status: 401 })

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard);

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
            billboardId: string;
        }
    }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body;
        if (!userId) return new NextResponse("unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.billboardId) return new NextResponse("Billboard Id is required", { status: 401 })

        if (!label) return new NextResponse("Label is required", { status: 400 })

        if (!imageUrl) return new NextResponse("Image Url is required", { status: 400 })
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });
        if (!storeByUserId) {
            return new NextResponse("unauthorized", { status: 401 })
        }
        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                imageUrl,
                label,
            }
        })
        return NextResponse.json(billboard)

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
            billboardId: string
        }
    }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.billboardId) return new NextResponse("Billboard Id is required", { status: 401 })

        await prismadb.billboard.deleteMany({
            where: {
                storeId: params.storeId,
                id: params.billboardId
            }
        })

        return NextResponse.json({
            message: "billboard deleted"
        })

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}