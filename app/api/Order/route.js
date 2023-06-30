import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(request) {
  try {
    const res = await query({
      query:
        "select o.orderid, p.productid, o.quantity, o.orderdate, c.customerid, c.customername from orders o join products p on p.productid = o.productid join customers c on c.customerid = o.customerid order by orderid asc;",
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
    const { ProductID, Quantity, CustomerID } = await request.json();
    if ((!ProductID, !Quantity, !CustomerID))
      return NextResponse.json({ message: "Failed" });
    const req = await query({
      query:
        "INSERT INTO Orders (ProductID, Quantity, OrderDate, CustomerID) VALUES (?, ?, curdate(), ?);",
      values: [ProductID, Quantity, CustomerID],
    });
    return NextResponse.json(req);
  } catch (error) {
    return NextResponse.json({
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
