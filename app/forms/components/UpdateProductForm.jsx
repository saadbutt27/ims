import React, { useState } from "react";

export default function UpdateProductForm() {
  const [searchProduct, setSearchProduct] = useState();
  const [searchDone, setSearchDone] = useState(false);
  const [productData, setProductData] = useState({
    productid: "",
    productname: "",
    description: "",
    price: "",
    quantity: "",
    categoryname: "",
    suppliername: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    let id = searchProduct;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/Product?productid=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      // console.log(res.ok);
      if (!res.ok) throw new Error("Failed to fetch data");
      const product = await res.json();
      if (product.message) throw new Error()
      setProductData((prev) => product);
      // console.log(productData);
      setSearchDone(true);
    } catch (error) {
      setSearchDone(false);
      alert("ID: " + id + " not found!");
      console.log("error: ", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let id = searchProduct;
    // console.log("ID:", id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/Product`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductID: productData.productid,
            ProductName: productData.productname,
            Description: productData.description,
            Price: productData.price,
            Quantity: productData.quantity,
          }),
        }
      );
      // console.log(res);
      if (!res.ok) throw new Error("Failed to fetch data");
      else alert("Updated successfully!");
    } catch (error) {
      setSearchDone(false);
      // alert("Update failed!");
      console.log("Error, Update failed!: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "price" && value <= 0) || (name === "quantity" && value <= 0)) {
      return
    }
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Seacrh Product
        </h2>
        {/* Search Customer Existence */}
        <form onSubmit={(e) => handleSearch(e)}>
          <div className="flex gap-2">
            <input
              type="text"
              name="searchProduct"
              id="searchProduct"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search product id"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:scale-105 duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {searchDone && productData && (
        <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update Product {productData.productid}
          </h2>
          <form onSubmit={(e) => handleUpdate(e)}>
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
                  name="productname"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product name"
                  required
                  value={productData.productname}
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
                <input
                  type="text"
                  name="categoryname"
                  id="categoryname"
                  className="cursor-not-allowed  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="2999"
                  required
                  value={productData.categoryname}
                  disabled
                />
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
                <input
                  type="text"
                  name="suppliername"
                  id="suppliername"
                  className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="2999"
                  required
                  value={productData.suppliername}
                  disabled
                />
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
              Update product
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
