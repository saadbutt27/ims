import React from "react";
import { formatDateTime } from "../../lib/dateFormatter";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/Transaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const transaction = await res.json();
    return transaction;
  } catch (error) {
    console.log("error: ", error);
  }
}

export default async function DisplayTransactions() {
  let transactions = await getData();
  console.log(transactions);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="w-full text-4xl text-gray-700 font-semibold text-center uppercase bg-gray-50 py-2.5 select-none">
        Transactions{" "}
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Id
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Date
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.data && transactions.data.map((transaction) => (
              <tr
                key={transaction.transactionid}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{transaction.transactionid}</td>
                <td className="px-6 py-4">{formatDateTime(transaction.transactiondate)}</td>
                <td className="px-6 py-4">{transaction.customerid}</td>
                <td className="px-6 py-4">{transaction.productid}</td>
                <td className="px-6 py-4">{transaction.orderid}</td>
                <td className="px-6 py-4">{transaction.paymentstatus? "Paid":"Unpaid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
