import React from "react";
import data from "../data/data";

const TeamsStanding = ({standingInfo}) => {
  if(!standingInfo)
  {
    return null;
  }
  return(
    <div className="bg-gray-200 min-h-screen">
      <div className="">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-1 p-2 grid md:grid-cols-12">
            <div className="text-sm flex md:col-span-1  flex justify-center">
              #
            </div>
            <div className="text-sm flex md:col-span-7  ">Team</div>
            <div className="grid md:grid-cols-7 md:col-span-4">
              <div className=" text-sm flex justify-center">P</div>
              <div className=" text-sm flex justify-center">W</div>
              <div className=" text-sm flex justify-center">L</div>
              <div className=" text-sm flex justify-center">D</div>
              <div className=" md:col-span-2 text-sm flex justify-center">
                Goals
              </div>
              <div className=" text-sm flex justify-center">
                Pts
              </div>
            </div>
          </div>
          <hr></hr>
          <ul>
            {standingInfo.map((info) => (
              <li>
                <div className="my-3 p-2 grid md:grid-cols-12 rounded-lg bg-gray-100">
                  <div className="text-sm flex items-center md:col-span-1 justify-center ">
                    <span className={`flex items-center justify-center rounded-lg w-5 ${standingInfo.indexOf(info)+1===1? "bg-golden": standingInfo.indexOf(info)+1===2? "bg-silver":standingInfo.indexOf(info)+1===3?" bg-bronze":""}`}>
                      {standingInfo.indexOf(info)+1}
                    </span>
                  </div>
                  <div className="text-sm flex md:col-span-7  ">
                    {info.team.name}
                  </div>
                  <div className="grid md:grid-cols-7 md:col-span-4">
                    <div className=" text-sm flex items-center justify-center">
                      {info.drawCount + info.wonCount + info.lostCount}
                    </div>
                    <div className=" text-sm flex items-center justify-center">
                      {info.wonCount}
                    </div>
                    <div className=" text-sm flex items-center justify-center ">
                    {info.lostCount}
                    </div>
                    <div className="text-sm flex items-center justify-center">
                    {info.drawCount}
                    </div>
                    <div className=" md:col-span-2 flex justify-center">
                      <div className="text-sm flex items-center rounded bg-green-200 mr-1">{info.scoredGoalsCount} </div>
                      <div className="text-sm flex items-center rounded bg-red-200"> {info.receivedGoalsCount}</div>
                    </div>
                    <div className="text-sm flex items-center justify-center">
                      {info.points}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>);
};

export default TeamsStanding;
