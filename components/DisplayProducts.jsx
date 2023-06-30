import React from "react";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/Product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const product = await res.json();
    return product;
  } catch (error) {
    console.log("error: ", error);
  }
}

export default async function DisplayProducts() {
  let products = await getData();
  console.log(products);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="w-full text-4xl text-gray-700 font-semibold text-center uppercase bg-gray-50 py-2.5 select-none">
          Products{" "}
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Id
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity in Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Supplier&apos;s Name
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{product.productid}</td>
                <td className="px-6 py-4">{product.productname}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.categoryname}</td>
                <td className="px-6 py-4">{product.suppliername}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
