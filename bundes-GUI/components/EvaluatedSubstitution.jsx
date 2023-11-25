import { getplayerImage } from "@/data_fetchers/home_page_fetchers/player_image_fetcher";
import React, { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { IoCalculatorOutline } from "react-icons/io5";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";
import { useChosenEvaluatedSubstitution } from "@/context APIs/ChosenEvaluatedSubstitution";

const EvaluatedSubstitution = ({ substitution }) => {
  let playerIn = substitution.event.eventDetail
    .split("In: ")[1]
    .split("\nOut:")[0];
  let playerOut = substitution.event.eventDetail
    .split("In: ")[1]
    .split("Out: ")[1];

  const [playerInImage, setPlayerInImage] = useState("");
  const [playerOutImage, setPlayerOutImage] = useState("");

  const {chosenEvaluatedSubstition, setChosenEvaluatedSubstitution} = useChosenEvaluatedSubstitution();


  useEffect(() => {
    if (substitution) {
      getplayerImage(
        substitution.event.season,
        substitution.event.teamId,
        playerIn
      )
        .then((response) => response.json())
        .then((data) => setPlayerInImage(data.playerImageUrl))
        .catch((error) => console.error("Error fetching data:", error));

      getplayerImage(
        substitution.event.season,
        substitution.event.teamId,
        playerOut
      )
        .then((response) => response.json())
        .then((data) => setPlayerOutImage(data.playerImageUrl))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [substitution.event.eventDetail.split("In: ")[1].split("\nOut:")[0]]);
  return (
    <div onClick={()=>setChosenEvaluatedSubstitution(substitution)} className={`flex pr-2 pl-2  items-center justify-start`}>
      <div className="flex w-full justify-between items-center pr-6 pl-6 p-3 pb-3   bg-gray-200 rounded-lg space-x-3 transition-transform hover:scale-105 hover:shadow-lg hover:cursor-pointer">
        <div className="flex flex-col flex-1 items-center justify-center">
          <Image
            className="rounded-[50%]"
            src={`data:image/png;base64,${playerInImage}`}
            width="45"
            height="45"
            alt="user"
          ></Image>
          <span className="text-xs text-green-800">
            {playerIn.length > 10
              ? playerIn.split(" ")[playerIn.split(" ").length - 1]
              : playerIn}
          </span>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="flex justify-center">
              <LuAlarmClock />
              <span className="text-xs">
                {substitution.event.eventDetail.split("In:")[0]}
              </span>
            </div>
            <div className="flex justify-center">
                <IoCalculatorOutline/>
                <span className="text-xs">{parseFloat(substitution.evaluationScore.toFixed(4))}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <Image
            className="rounded-[50%]"
            src={`data:image/png;base64,${playerOutImage}`}
            width="45"
            height="45"
            alt="user"
          ></Image>
          <span className="text-xs text-red-800">{playerOut}</span>
        </div>
      </div>
    </div>
  );
};

export default EvaluatedSubstitution;
