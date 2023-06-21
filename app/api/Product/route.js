import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const res = await query({
      query:
        "select p.productid, p.productname, p.description, p.price, p.quantity, c.categoryid, c.categoryname, s.supplierid, s.suppliername from products p join categories c on c.categoryid = p.categoryid join suppliers s on s.supplierid = p.supplierid order by productid asc;",
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
    const {
      ProductName,
      Description,
      Price,
      Quantity,
      CategoryID,
      SupplierID,
    } = await request.json();
    if (
      (!ProductName, !Description, !Price, !Quantity, !CategoryID, !SupplierID)
    )
      return NextResponse.json({ message: "Failed" });
    const req = await query({
      query:
        "INSERT INTO Products (ProductName, Description, Price, Quantity, CategoryID, SupplierID) VALUES (?, ?, ?, ?, ?, ?);",
      values: [
        ProductName,
        Description,
        Price,
        Quantity,
        CategoryID,
        SupplierID,
      ],
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
