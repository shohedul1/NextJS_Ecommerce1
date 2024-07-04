import Product from "@/lib/model/Product";
import connect from "@/lib/mongdb/database";
import { NextRequest } from "next/server";


interface Params {
    query: string;
}


export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect();

        const { query } = params;
        let works = [];

        if (query === "all") {
            works = await Product.find();
        } else {
            works = await Product.find({
                $or: [
                    { 'category': { $regex: query, $options: "i" } },
                    { 'title': { $regex: query, $options: "i" } },
                ]
            });
        }

        if (!works) return new Response("No works found", { status: 404 });

        return new Response(JSON.stringify(works), { status: 200 });
    } catch (err) {
        console.log(err)
        return new Response("Internal server error", { status: 500 });
    }
};