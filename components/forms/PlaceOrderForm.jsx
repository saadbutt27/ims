import React, { useState } from "react";

export default function PlaceOrderForm() {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [existingCustomer, setExistingCustomer] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    address: "",
    contactInformation: "",
  });

  const [orderData, setOrderData] = useState({
    productID: "",
    quantity: "",
    customerID: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/Customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: {
        //   customerName: searchCustomer,
        // },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch data");
      const customer = await res.json();
      console.log(res.ok, customer);
      const a = customer.data.find(
        (obj) => obj.CustomerName.toLowerCase() === searchCustomer.toLowerCase()
      );
      if (a) {
        setExistingCustomer(true);
        console.log("mil gya");
        setSearchCustomer("");
      } else {
        setExistingCustomer(false);
        console.log("nahi mila");
      }
      setSearchDone(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/Customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CustomerName: customerData.customerName,
          Address: customerData.address,
          ContactInformation: customerData.contactInformation,
        }),
      });
      console.log(res.ok);
      if (res.ok) {
        alert("Insertion succeed!");
        setCustomerData({
          customerName: "",
          address: "",
          contactInformation: "",
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductID: orderData.productID,
          Quantity: orderData.quantity,
          CustomerID: orderData.customerID,
        }),
      });
      console.log(res.ok);
      if (res.ok) {
        alert("Insertion succeed!");
        setOrderData({
          productID: "",
          quantity: "",
          customerID: "",
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Seacrh Customer
        </h2>
        {/* Search Customer Existence */}
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <input
              type="text"
              name="searchCustomer"
              id="searchCustomer"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search customer"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
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
      {searchDone && !existingCustomer && (
        <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            New Customer
          </h2>
          {/* Customer Info Form */}
          <form onSubmit={handleCustomerSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="customerName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Customer name"
                  required
                  value={customerData.customerName}
                  onChange={handleCustomerChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address"
                  required
                  value={customerData.address}
                  onChange={handleCustomerChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="contactInformation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Information
                </label>
                <input
                  type="text"
                  name="contactInformation"
                  id="contactInformation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Contact information"
                  required
                  value={customerData.contactInformation}
                  onChange={handleCustomerChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:scale-105 duration-300"
            >
              Submit Customer Info
            </button>
          </form>
        </div>
      )}
      {searchDone && existingCustomer && (
        <div className="py-8 px-0 lg:px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Place a new Order
          </h2>
          {/* Placing Order Form */}
          <form onSubmit={handleOrderSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  htmlFor="productID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product ID
                </label>
                <select
                  id="productID"
                  name="productID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={orderData.productID}
                  onChange={handleOrderChange}
                >
                  <option value="">Select product</option>
                  <option value="1">Product 1</option>
                  <option value="2">Product 2</option>
                  <option value="3">Product 3</option>
                  <option value="4">Product 4</option>
                  <option value="5">Product 5</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="quantity"
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
                  value={orderData.quantity}
                  onChange={handleOrderChange}
                />
              </div>
              {/* <div>
                <label
                  htmlFor="orderDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order Date
                </label>
                <input
                  type="date"
                  name="orderDate"
                  id="orderDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={orderData.orderDate}
                  onChange={handleOrderChange}
                />
              </div> */}
              <div>
                <label
                  htmlFor="customerID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer ID
                </label>
                <select
                  id="customerID"
                  name="customerID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={orderData.customerID}
                  onChange={handleOrderChange}
                >
                  <option value="">Select customer</option>
                  <option value="1">Customer 1</option>
                  <option value="2">Customer 2</option>
                  <option value="3">Customer 3</option>
                  <option value="4">Customer 4</option>
                  <option value="5">Customer 5</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:scale-105 duration-300"
            >
              Add product to order
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
