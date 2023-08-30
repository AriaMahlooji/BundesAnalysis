import Header from "@/components/Header";
import React from "react";
import { data } from "../data/data";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const orders = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header title={"Orders"}></Header>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-200 rounded-lg my-4 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="flex-row items-center ml-4">
                    <div className="font-bold">
                      <span>${order.total}</span>
                    </div>
                    <div className="text-gray-400">{order.name.first}</div>
                  </div>
                </div>
                <div className="inline-block w-auto sm:text-left text-right">
                  <span
                    className={`text-sm rounded-lg p-3 ${
                      order.status === "On Hold"
                        ? "bg-yellow-200"
                        : order.status === "Completed"
                        ? "bg-green-300"
                        : "bg-blue-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <span className="hidden md:grid text-sm">{order.date}</span>
                <div className="sm:flex hidden justify-between items-center">
                  <span className="pl-2">{order.method}</span>
                  <BsThreeDotsVertical className="text-purple-800" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default orders;
