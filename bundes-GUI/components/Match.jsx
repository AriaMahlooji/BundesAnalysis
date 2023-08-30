import React from "react";
import Image from "next/image";
import {FiInfo} from"react-icons/fi"

const Match = ({match}) => {
  return (
    <div>
      <div className="rounded-lg bg-gray-200 flex justify-between items-center p-1">
        <div className="flex flex-col flex-1 border border-red-200 items-center justify-center">
            <Image
              className="rounded-[50%]"
              src={`data:image/png;base64,${match.homeTeamLogo}`}
              width="30"
              height="30"
              alt="user"
            ></Image>
          <div className="flex items-start justify-start  ">{match.match.homeTeam.teamName}</div>
        </div>
        <div className=" flex flex-col  border border-red-200 justify-between items-center space-y-3">
            <div className="text-xs">{match.match.date}</div>
            <div className="flex justify-between items-center">
                <div>{match.match.homeTeamScore}</div>
                <div>-</div>
                <div>{match.match.awayTeamScore}</div>
            </div>
            <FiInfo className="border border-blue-800"/>
        </div>
        <div className="flex flex-col flex-1 border border-red-200 items-center justify-center ">
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
      </div>
    </div>
  );
};

export default Match;
