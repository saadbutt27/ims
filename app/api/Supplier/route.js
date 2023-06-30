import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const res = await query({
      query: "select * from suppliers;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log("asd" + err.message);
    throw new Error("Failed to fetch datas");
  }
}
