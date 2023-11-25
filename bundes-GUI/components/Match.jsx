import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";
import { getMatchFinalStatusFor } from "@/functions/getMatchFinalStatusFor";
import { useChosenMatch } from "@/context APIs/ChosenMatchContext";
import { BsFillCircleFill } from "react-icons/bs";

const Match = ({ match, chosenTeamId }) => {
  const { chosenMatch, setChosenMatch } = useChosenMatch();

  return (
    <div onClick={() => {setChosenMatch(match);}}>
      <div
        className={`rounded-lg flex justify-between items-center p-1 bg-gray-200 transition-transform hover:scale-105 hover:shadow-lg hover:cursor-pointer`}
      >
        <div className="flex flex-col flex-1  items-center justify-center">
          <Image
            className="rounded-[50%]"
            src={`data:image/png;base64,${match.homeTeamLogo}`}
            width="30"
            height="30"
            alt="user"
          ></Image>
          <div className="flex items-start justify-start  ">
            {match.match.homeTeam.teamName}
          </div>
        </div>
        <div className=" flex flex-col   justify-between items-center space-y-3">
          <div className="text-xs">{match.match.date}</div>
          <div className="flex justify-between items-center">
            <div>{match.match.homeTeamScore}</div>
            <div>-</div>
            <div>{match.match.awayTeamScore}</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center ">
          <div className="">
            <Image
              className="rounded-[50%]"
              src={`data:image/png;base64,${match.awayTeamLogo}`}
              width="30"
              height="30"
              alt="user"
            ></Image>
          </div>
          <div>{match.match.awayTeam.teamName}</div>
        </div>
        <div className="flex flex-col flex-1/2 items-center justify-center">
          <BsFillCircleFill
            color={
              getMatchFinalStatusFor(match, chosenTeamId) === "won"
                ? "green"
                : getMatchFinalStatusFor(match, chosenTeamId) === "lost"
                ? "red"
                : "gray"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Match;
