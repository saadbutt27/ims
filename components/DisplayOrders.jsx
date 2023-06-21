import React from "react";
import { formatDateTime } from "@/lib/dateFormatter";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/Order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const order = await res.json();
    return order;
  } catch (error) {
    console.log("error: ", error);
  }
}

export default async function DisplayOrders() {
  let orders = await getData();
  console.log(orders);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="w-full text-4xl text-gray-700 font-semibold text-center uppercase bg-gray-50 py-2.5 select-none">
          Orders{" "}
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Quatntity
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{order.orderid}</td>
                <td className="px-6 py-4">{formatDateTime(order.orderdate)}</td>
                <td className="px-6 py-4">{order.customerid}</td>
                <td className="px-6 py-4">{order.productid}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">5000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
