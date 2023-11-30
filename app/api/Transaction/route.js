import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const res = await query({
      query:
        "select t.transactionid, p.productid, o.orderid, t.paymentstatus, t.transactiondate, c.customerid, c.customername from transactions t join products p on p.productid = t.productid join customers c on c.customerid = t.customerid join orders o on o.orderid = t.orderid order by transactionid asc;",
      values: [],
    });
    return NextResponse.json({ data: res });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch transactions data" });
  }
}

// export async function POST(request) {
//   try {
//     const { ProductID, OrderID, CustomerID } = await request.json();
//     if ((!ProductID, !OrderID, !CustomerID))
//       return NextResponse.json({ message: "Failed" });
//     const req = await query({
//       query:
//         "INSERT INTO Transactions (ProductID, TransactionDate, CustomerID, OrderID, PaymentStatus) VALUES (?, curdate(), ?, ?, 0);",
//       values: [ProductID, CustomerID, OrderID],
//     });
//     return NextResponse.json(req);
//   } catch (error) {
//     return NextResponse.json({
//       message: error.message,
//     });
//   }
// }