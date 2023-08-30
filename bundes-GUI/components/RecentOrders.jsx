import React from "react";
import { data } from "../data/data";
import { FaShoppingBag } from "react-icons/fa";

const RecentOrders = () => {
  return (
    <div>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
        <h1>recent orders</h1>
        <ul>
          {data.map((order, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaShoppingBag className="text-purple-800" />
              </div>
              <div className="flex-col items-center space-y-1 ml-5">
                <div>
                  <span className="font-bold">${order.total}</span>
                </div>
                <div>
                  <span className="text-gray-400">{order.name.first}</span>
                </div>
              </div>
              <div className="lg:flex ml-auto md:hidden">
                <div>
                  <span className="text-sm">{order.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentOrders;
