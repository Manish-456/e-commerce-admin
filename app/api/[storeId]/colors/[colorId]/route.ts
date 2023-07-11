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
            colorId: string
        }
    }
) {
    try {

        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.colorId) return new NextResponse("color Id is required", { status: 401 })

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log(`[color.DELETE] `, error);
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
            colorId: string;
        }
    }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
        if (!userId) return new NextResponse("unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.colorId) return new NextResponse("color Id is required", { status: 401 })

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
        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                value,
                name,
            }
        })
        return NextResponse.json(color)

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
            colorId: string
        }
    }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
        if (!params.storeId) return new NextResponse("Store Id is required", { status: 401 })
        if (!params.colorId) return new NextResponse("color Id is required", { status: 401 })

        await prismadb.color.deleteMany({
            where: {
                storeId: params.storeId,
                id: params.colorId
            }
        })

        return NextResponse.json({
            message: "color deleted"
        })

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}