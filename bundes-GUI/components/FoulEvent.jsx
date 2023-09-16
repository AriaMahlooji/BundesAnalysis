import React, { useEffect, useState } from "react";
import TwitterIcon from "@/SVGs/Twitter";
import Image from "next/image";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { LuAlarmClock } from "react-icons/lu";
import { SecondYellowCard } from "@/SVGs/SecondYellowCard";
import { getPlayerImageByFullName } from "@/data_fetchers/home_page_fetchers/player_image_fetcher";

const FoulEvent = ({ event }) => {
  let playerName = event.eventDetail.split("\n")[1];
  const [playerImage, setPlayerImage] = useState("");

  useEffect(() => {
    if (event) {
      getPlayerImageByFullName(playerName)
        .then((response) => response.json())
        .then((data) => setPlayerImage(data.playerImageUrl))
        .catch((error) => console.error("Error fetching data:", error));
    }
  },[event.eventDetail.split("\n")[1]]);

  return (
    <div
      className={`flex pr-8 pl-8 items-center  ${
        event.typ === "home" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex w-1/2 justify-between items-center pr-6 pl-6 p-3 pb-3   bg-gray-200 rounded-lg space-x-3">
        <div className="text-xs flex flex-col items-center justify-center">
          <Image
            className="rounded-[50%]"
            src={`data:image/png;base64,${playerImage}`}
            width="30"
            height="30"
            alt="user"
          ></Image>
          <span>{playerName.length>10?playerName.split(" ")[playerName.split(" ").length-1]: playerName}</span>
        </div>
        <div className=" p-2 space-y-2 text-xs flex flex-col items-center justify-center">
          <LuAlarmClock className=" text-lg " />
          <span>{event.eventDetail.split("\n")[0]}</span>
        </div>
        <div className="text-lg flex flex-col items-center justify-center">
          {event.title === "Yellow card" && (
            <TbRectangleVerticalFilled className="text-yellow-400" />
          )}
          {event.title === "Red card" && (
            <TbRectangleVerticalFilled className="text-red-600" />
          )}
          {event.title === "2nd Yellow card (Red)" && (
            <SecondYellowCard className="text-red-400 text-2xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoulEvent;
