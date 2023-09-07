import { getplayerImage } from "@/data_fetchers/home_page_fetchers/player_image_fetcher";
import React, { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import Image from "next/image";

const SubtitutionEvent = ({ event }) => {
  let playerIn = event.eventDetail.split("In: ")[1].split("\nOut:")[0];
  let playerOut = event.eventDetail.split("In: ")[1].split("Out: ")[1];

  const [playerInImage, setPlayerInImage] = useState("");
  const [playerOutImage, setPlayerOutImage] = useState("");

  useEffect(() => {
    if (event) {
      console.log(event.season, event.teamId, playerIn);
      getplayerImage(event.season, event.teamId, playerIn)
        .then((response) => response.json())
        .then((data) => setPlayerInImage(data.playerImageUrl))
        .catch((error) => console.error("Error fetching data:", error));

      getplayerImage(event.season, event.teamId, playerOut)
        .then((response) => response.json())
        .then((data) => setPlayerOutImage(data.playerImageUrl))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [event]);

  return (
    <div
      className={`flex pr-8 pl-8 items-center  ${
        event.typ === "home" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex w-1/2 justify-between items-center pr-6 pl-6 p-3 pb-3   bg-gray-200 rounded-lg space-x-3">
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-[50%]"
              src={`data:image/png;base64,${playerInImage}`}
              width="30"
              height="30"
              alt="user"
            ></Image>
          </div>
          <span className="text-xs text-green-800">{playerIn}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <LuAlarmClock />
            <span className="text-xs">{event.eventDetail.split("In:")[0]}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-[50%]"
              src={`data:image/png;base64,${playerOutImage}`}
              width="30"
              height="30"
              alt="user"
            ></Image>
          </div>
          <span className="text-xs text-red-800">{playerOut}</span>
        </div>
      </div>
    </div>
  );
};

export default SubtitutionEvent;
