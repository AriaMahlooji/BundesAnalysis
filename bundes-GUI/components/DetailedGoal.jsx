import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LuAlarmClock } from "react-icons/lu";
import { BiFootball } from "react-icons/bi";
import { PiSneakerMoveFill } from "react-icons/pi";
import { getPlayerImageByFullName } from "@/data_fetchers/home_page_fetchers/player_image_fetcher";
import { useSide } from "@/context APIs/SideContext";
import { getTeamImageById } from "@/data_fetchers/home_page_fetchers/team_image_fetcher";
import {SlCalender} from "react-icons/sl";
import { useChosenMatch } from "@/context APIs/ChosenMatchContext";
import { FiInfo } from "react-icons/fi";


const DetailedGoal = ({ goal }) => {
  let scorer = goal.eventDetail.split("\n")[2];
  const [scorerImage, setScorerImage] = useState("");
  const { side, setSide } = useSide();
  const [targetTeamLogo, setTargetTeamLogo] = useState();
  const [targetTeamName, setTargetTeamName] = useState();
  const {chosenMatch, setChosenMatch} = useChosenMatch();


  useEffect(() => {
    getPlayerImageByFullName(scorer)
      .then((response) => response.json())
      .then((data) => setScorerImage(data.playerImageUrl))
      .catch((error) => console.error("Error fetching data:", error));
  }, [goal.eventDetail.split("\n")[2]]);

  useEffect(() => {
    if (side == "on") {
      getTeamImageById(goal.teamId)
        .then((response) => response.json())
        .then((data) => {
          setTargetTeamLogo(data.image);
          setTargetTeamName(data.name);
        });
    } else {
      getTeamImageById(goal.eventTeamOpponentId)
        .then((response) => response.json())
        .then((data) => {
          setTargetTeamLogo(data.image);
          setTargetTeamName(data.name);
        });
    }
  }, [goal.eventDetail.split("\n")[2], targetTeamName]);

  return (
    <div className="flex justify-between bg-gray-200 rounded-lg p-2">
      <div className="flex flex-1 items-center justify-center">
        <Image
          className="rounded-[50%] h-12 w-12"
          src={`data:image/png;base64,${scorerImage}`}
          width="30"
          height="30"
          alt="user"
        ></Image>
      </div>
      <div className="flex flex-col flex-1 space-y-2">
        <div className="flex justify-center items-center space-x-2 ">
          <BiFootball className={`text-${side==="by"?"green":"red"}-800`}></BiFootball>
          <div  className={`text-xs text-${side==="by"?"green":"red"}-800`}>{scorer.length>10?scorer.split(" ")[scorer.split(" ").length-1]: scorer}</div>
        </div>
        {goal.eventDetail.includes("Assist") && (
          <div className="flex justify-center items-center space-x-2">
            <PiSneakerMoveFill />
            <div className="text-xs">
              {goal.eventDetail.split("Assist: ")[1].length>10? goal.eventDetail.split("Assist: ")[1].split(" ")[goal.eventDetail.split("Assist: ")[1].split(" ").length-1]:goal.eventDetail.split("Assist: ")[1]}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center space-x-5">
          <div className="flex justify-center items-center text-xs">
            <SlCalender></SlCalender>
            <div>{goal.season}</div>
          </div>
          <div className="flex justify-center items-center text-xs">
            <LuAlarmClock></LuAlarmClock>
            <div>{goal.eventDetail.split("\n")[0]}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <Image
          className="rounded-[50%] h-10 w-10"
          src={`data:image/png;base64,${targetTeamLogo}`}
          width="30"
          height="30"
          alt="user"
        ></Image>
        <div className="flex items-center justify-center text-xs">
          {targetTeamName}
        </div>
      </div>
    </div>
  );
};

export default DetailedGoal;
