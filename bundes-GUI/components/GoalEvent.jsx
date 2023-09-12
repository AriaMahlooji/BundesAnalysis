import React from "react";
import { BiFootball } from "react-icons/bi";
import { LuAlarmClock } from "react-icons/lu";
import { GiGoalKeeper } from "react-icons/gi";
import { PiSneakerMoveFill } from "react-icons/pi";

const GoalEvent = ({ event }) => {
  return (
    <div
      className={`flex pr-16 pl-16 ${
        event.typ === "home" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`bg-gray-200 rounded-xl flex flex-col p-2 w-1/2 items-center`}
      >
        {event.title === "Goal" && (
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2">
              <BiFootball className="text-green-800"></BiFootball>
              <span className="text-xs text-green-800">
                {event.eventDetail.split("\n")[2]}
              </span>
            </div>
            {event.eventDetail.includes("Assist") && (
              <div className="flex items-center space-x-2">
                <PiSneakerMoveFill />
                <span className="text-xs">
                  {event.eventDetail.split("Assist:")[1]}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <LuAlarmClock></LuAlarmClock>
              <span className="text-xs">
                {event.eventDetail.split("\n")[0]}
              </span>
            </div>
          </div>
        )}
        {event.title === "Penalty" && (
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2">
              <GiGoalKeeper></GiGoalKeeper>
              <span className="text-xs">
                {event.eventDetail.split("\n")[2]}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <LuAlarmClock></LuAlarmClock>
              <span className="text-xs">
                {event.eventDetail.split("\n")[0]}
              </span>
            </div>
          </div>
        )}
        {event.title === "Own goal" && (
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2">
              <BiFootball className="text-red-800"></BiFootball>
              <span className="text-xs text-red-800">
                {event.eventDetail.split("\n")[2]}
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:">
              <LuAlarmClock></LuAlarmClock>
              <span className="text-xs">
                {event.eventDetail.split("\n")[0]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalEvent;
