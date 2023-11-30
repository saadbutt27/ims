import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const res = await query({
      query: "select * from categories;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch categories data" });

  }
}
