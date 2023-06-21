import React, { useState } from "react";

const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const category = await res.json();
    return category;
  } catch (error) {
    console.log("error: ", error);
  }
};
const getSuppliers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Supplier", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const supplier = await res.json();
    return supplier;
  } catch (error) {
    console.log("error: ", error);
  }
};

export default function AddPrdouctForm() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    supplierId: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Products: ", productData);
    try {
      const res = await fetch("http://localhost:3000/api/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productData.name,
          Description: productData.description,
          Price: productData.price,
          Quantity: productData.quantity,
          CategoryID: productData.category,
          SupplierID: productData.supplierId,
        }),
      });
      console.log(res.ok);
      if (res.ok) alert("Insertion succeed!");
    } catch (error) {
      console.log("Error");
    }
  };

  // let categories = await getCategories();
  // let suppliers = await getSuppliers();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product name"
                required
                value={productData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={productData.category}
                onChange={handleChange}
              >
                <option defaultValue={"0"}>Select category</option>
                {/* {categories.data.map((category, index) => (
                  <option key={index} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))} */}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2999"
                required
                value={productData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="SupplierId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Supplier Id
              </label>
              <select
                id="SupplierId"
                name="supplierId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={productData.supplierId}
                onChange={handleChange}
              >
                <option defaultValue={"0"}>Select Id</option>
                {/* {suppliers.data.map((supplier, index) => (
                  <option key={index} value={supplier.SupplierID}>
                    {supplier.SupplierName}
                  </option>
                ))} */}
              </select>
            </div>
            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="20"
                required
                value={productData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                value={productData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:scale-105 duration-300"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
}
