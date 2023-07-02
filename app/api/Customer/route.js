import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const res = await query({
      query: "select * from customers;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log("asd" + err.message);
    throw new Error("Failed to fetch datas");
  }
}

export async function POST(request) {
  try {
    const { CustomerName, Address, ContactInformation } = await request.json();
    if ((!CustomerName, !Address, !ContactInformation))
      return NextResponse.json({ message: "Failed" });
    const req = await query({
      query:
        "INSERT INTO Customers (CustomerName, Address, ContactInformation) VALUES (?, ?, ?);",
      values: [CustomerName, Address, ContactInformation],
    });
    return NextResponse.json(req);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
