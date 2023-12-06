import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const res = await query({
      query:
        "select o.orderid, p.productid, o.quantity, o.orderdate, c.customerid, c.customername, o.amount from orders o join products p on p.productid = o.productid join customers c on c.customerid = o.customerid order by orderid asc;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch orders data" });
  }
}

export async function POST(request) {
  try {
    const { ProductID, Quantity, CustomerID, Amount } = await request.json();
    const totalAmount = Amount * Quantity
    if ((!ProductID, !Quantity, !CustomerID, !totalAmount))
      return NextResponse.json({ message: "Failed" });
    const res = await query({
      query:
        "CALL place_order(?, ?, ?, ?);",
      values: [ProductID, Quantity, CustomerID, totalAmount],
    });
    // console.log("Hello", res[0])
    let mess = res[0]
    if (mess[0].message === "Not enough quantity available") {
      throw new Error("Quantity unavailable.")
    }
    return NextResponse.json(res);
  } catch (error) {
    // console.log("Hello", error)
    return NextResponse.error({
      message: error.message,
    });
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     const { id, task, completed }: Todo = await request.json();
//     if (!completed) return NextResponse.json({ message: "Failed" });
//     const req = await query({
//       query: "update todos set completed = ?",
//       values: [completed && '1'],
//     });
//     return NextResponse.json(req);
//   } catch (error) {
//     return NextResponse.json({
//       message: (error as { message: string }).message,
//     });
//   }
// }

// export async function DELETE(request: NextRequest) {
//   // console.log(await request.json());
//   try {
//     const {searchParams} = new URL(request.url);
//     const {id} = {id:searchParams.get('id')}
//     // const { id, task, completed }: Todo = await request.json();
//     // console.log("res:");
//     // const id = 2;
//     if (!id) return NextResponse.json({ message: "Failed" });
//     const req = await query({
//       query: "delete from todos where id = ?",
//       values: [id.toString()],
//     });
//     return NextResponse.json(req);
//   } catch (error) {
//     console.log("error");
//     return NextResponse.json({
//       message: (error as { message: string }).message,
//     });
//   }
// }
