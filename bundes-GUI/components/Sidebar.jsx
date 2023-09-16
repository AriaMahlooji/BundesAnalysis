import React from "react";
import Image from "next/image";
import Link from "next/link";
import {RxSketchLogo, RxDashboard, RxPerson} from "react-icons/rx";
import { FiSettings} from "react-icons/fi";
import {HiOutlineShoppingBag} from "react-icons/hi";
import { useRouter } from "next/router";
import {BiLineChart} from "react-icons/bi";
import {RiTeamFill} from "react-icons/ri";
import {TeamPlayerIcon} from "@/SVGs/TeamPlayer";
import {IoIosFootball} from "react-icons/io";




const Sidebar = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="">
            <div className="bg-purple-900 text-white p-3 rounded-lg inline-block">
              <IoIosFootball size={30}/>
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-400 w-full p-2"></span>
          <Link href="/">
            <div className={` hover:bg-gray-300  my-4 p-3 rounded-lg inline-block ${router.asPath ==="/" ? "bg-gray-400": "bg-gray-100"}`}>
              <RxDashboard size={20}/>
            </div>
          </Link>
          <Link href="/">
            <div className={` hover:bg-gray-300  my-4 p-3 rounded-lg inline-block ${router.asPath ==="/analysis" ? "bg-gray-400": "bg-gray-100"}`}>
              <BiLineChart size={20}/>
            </div>
          </Link>
          <Link href="/players">
            <div className={` hover:bg-gray-300  my-4 p-3 rounded-lg inline-block ${router.asPath ==="playersEdit" ? "bg-gray-400": "bg-gray-100"}`}>
              <TeamPlayerIcon size={20}/>
            </div>
          </Link>
          <Link href="/settings">
            <div className="bg-gray-100 hover:bg-gray-300  my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20}/>
            </div>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
