import React from "react";
import Image from "next/image";
import { userImage } from "../public/Aria.png";
const Header = ({ title }) => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <div>{title}</div>
      <div className="flex  bg-purple-800 text-white rounded-tl-lg rounded-tr-2xl rounded-br-2xl rounded-bl-lg border-red-800 hover:cursor-pointer">
        <span className="p-1">Aria Mahlooji</span>
        <Image
          className="rounded-[50%]"
          src="/Aria.png"
          width="30"
          height="30"
          alt="user"
        ></Image>
      </div>
    </div>
  );
};

export default Header;
