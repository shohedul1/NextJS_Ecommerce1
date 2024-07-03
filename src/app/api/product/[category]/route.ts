import Product from "@/lib/model/Product";
import connect from "@/lib/mongdb/database";
import { NextRequest } from "next/server";

interface Params {
    category: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect();

        const { category } = params;

        let workList;

        if (category === "All") {
            workList = await Product.find();
        } else {
            workList = await Product.find({ category })
        }
        return new Response(JSON.stringify(workList), { status: 200 });
    } catch (err) {
        console.error('Failed to fetch Work List:', err);
        return new Response("Failed to fetch Work List", { status: 500 });
    }
};