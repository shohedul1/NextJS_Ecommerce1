import Product from "@/lib/model/Product";
import connect from "@/lib/mongdb/database";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connect();
    const work = await Product.findById(params.id);
    if (!work) return new Response("The Work Not Found", { status: 404 });
    return new Response(JSON.stringify(work), { status: 200 });
  } catch (err) {
    console.error("Error fetching the Work:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
