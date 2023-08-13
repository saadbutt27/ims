import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { useSearchParams } from "next/navigation";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const { id } = { id: searchParams.get("productid") };
    let res;
    if (!id) {
      res = await query({
        query:
          "select p.productid, p.productname, p.description, p.price, p.quantity, c.categoryid, c.categoryname, s.supplierid, s.suppliername from products p join categories c on c.categoryid = p.categoryid join suppliers s on s.supplierid = p.supplierid order by productid asc;",
        values: [],
      });
      return NextResponse.json({ data: res });
    } else {
      res = await query({
        query:
          "select p.productid, p.productname, p.description, p.price, p.quantity, c.categoryname, s.suppliername from products p join categories c on c.categoryid = p.categoryid join suppliers s on s.supplierid = p.supplierid where p.productid = ?;",
        values: [id],
      });
      return NextResponse.json(res[0]);
    }
  } catch (err) {
    console.log("asd " + err.message);
    throw new Error("Failed to fetch data");
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

export async function PUT(request) {
  try {
    const { ProductID, ProductName, Description, Price, Quantity } =
      await request.json();
    if (!ProductID && (!ProductName || !Description || !Price || !Quantity))
      return NextResponse.json({ message: "Failed" });
    const req = await query({
      query:
        "update products set productname = ?, description = ? , price = ?, quantity = ? where productid = ?;",
      values: [ProductName, Description, Price, Quantity, ProductID],
    });
    return NextResponse.json(req);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const { id } = { id: searchParams.get("productid") };
    if (!id) return NextResponse.json({ message: "Failed" });
    const req = await query({
      query: "delete from products where productid = ?;",
      values: [id],
    });
    console.log(req);
    return NextResponse.json(req);
  } catch (error) {
    console.log(error);
    // return NextResponse.json({
    //   message: error.message,
    // });
    throw new Error("Failed to delete!");
  }
}
