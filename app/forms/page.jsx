"use client";
import React, { useState } from "react";
import AddPrdouctForm from "./components/AddPrdouctForm";
import PlaceOrderForm from "./components/PlaceOrderForm";
import UpdateProductForm from "./components/UpdateProductForm";

export default function Forms() {
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="border-b-2 border-b-black flex flex-wrap justify-around">
        <div className="flex flex-grow sm:flex-grow-0">
          <button
            className={`py-2 px-6 rounded-md shadow-lg m-4 text-center flex-grow ${
              activeButton === "product"
                ? "bg-black text-white"
                : "bg-slate-200"
            }`}
            onClick={() => handleButtonClick("product")}
          >
            Product Form
          </button>
        </div>
        <div className="flex flex-grow sm:flex-grow-0">
          <button
            className={`py-2 px-6 rounded-md shadow-lg m-4 text-center flex-grow ${
              activeButton === "updateProduct"
                ? "bg-black text-white"
                : "bg-slate-200"
            }`}
            onClick={() => handleButtonClick("updateProduct")}
          >
            Update Product Form
          </button>
        </div>
        <div className="flex flex-grow sm:flex-grow-0">
          <button
            className={`py-2 px-6 rounded-md shadow-lg m-4 text-center flex-grow ${
              activeButton === "order" ? "bg-black text-white" : "bg-slate-200"
            }`}
            onClick={() => handleButtonClick("order")}
          >
            Order Form
          </button>
        </div>
      </div>

      <div className="my-4 px-6 pt-2 pb-8 bg-white border-2 shadow-md h-auto">
        {activeButton === "product" ? (
          <AddPrdouctForm />
        ) : activeButton === "updateProduct" ? (
          <UpdateProductForm />
        ) : activeButton === "order" ? (
          <PlaceOrderForm />
        ) : (
          <div className="flex items-center justify-center">
            <h2 className="text-4xl font-semibold">Choose one</h2>
          </div>
        )}
      </div>
    </div>
  );
}
