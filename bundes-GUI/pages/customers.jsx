import React from "react";
import { data } from "../data/data";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import Head from "next/head";
import Header from "@/components/Header";

const customers = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header title={"Customers"}></Header>

      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
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
                  <div className="bg-purple-300 p-2 rounded-lg">
                    <BsPersonFill className="text-purple-800" />
                  </div>
                  <span className="pl-2">
                    {order.name.first + " " + order.name.last}
                  </span>
                </div>
                <span className="sm:text-left text-right text-sm">
                  {order.name.first}@gmail.com
                </span>
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

export default customers;
