import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(request) {
  try {
    const res = await query({
      query: "select * from categories;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log("asd" + err.message);
    throw new Error("Failed to fetch datas");
  }
}
