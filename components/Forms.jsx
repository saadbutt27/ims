import React, { useState } from "react";
import Link from "next/link";
import AddPrdouctForm from "./forms/AddPrdouctForm";
import PlaceOrderForm from "./forms/PlaceOrderForm";

export default function Forms() {
  const [activeButton, setActiveButton] = useState("product");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="border-b-2 border-b-black flex flex-wrap justify-around">
        <Link href={"/"} className="flex flex-grow sm:flex-grow-0">
          <button
            className={`py-2 px-6 rounded-md shadow-lg m-4 text-center flex-grow ${
              (activeButton || "product") === "product"
                ? "bg-black text-white"
                : "bg-slate-200"
            }`}
            onClick={() => handleButtonClick("product")}
          >
            Product Form
          </button>
        </Link>
        <Link href={"/"} className="flex flex-grow sm:flex-grow-0">
          <button
            className={`py-2 px-6 rounded-md shadow-lg m-4 text-center flex-grow ${
              activeButton === "order" ? "bg-black text-white" : "bg-slate-200"
            }`}
            onClick={() => handleButtonClick("order")}
          >
            Order Form
          </button>
        </Link>
      </div>

      <div className="my-4 px-6 pt-2 pb-8 bg-white border-2 shadow-md h-auto">
        {activeButton === "product" ? <AddPrdouctForm /> : <PlaceOrderForm />}
      </div>
    </div>
  );
}
