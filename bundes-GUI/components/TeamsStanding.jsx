import React, { useContext, useState } from "react";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSeason } from "@/context APIs/SeasonHomePageContext";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import { useTeamId } from "@/context APIs/TeamIdContext";
import { useFinalStatus } from "@/context APIs/FinalStatusContext";

const TeamsStanding = ({ standingInfo }) => {
  const { pageNumber, setPageNumber } = usePageNumber();
  const { teamId, setTeamId } = useTeamId();
  const { seasons, setSeasons } = useSeason();
  const { finalStatus, setFinalStatus } = useFinalStatus();
  const setChosenSeason = (key) => {
    setPageNumber(1);
    if (key === "All") {
      setSeasons([
        "15/16",
        "16/17",
        "17/18",
        "18/19",
        "19/20",
        "20/21",
        "21/22",
      ]);
    } else {
      setSeasons([key]);
    }
  };

  const setChosenTeam = (id) => {
    setTeamId(id);
  };
  const seasonsList = [
    "15/16",
    "16/17",
    "17/18",
    "18/19",
    "19/20",
    "20/21",
    "21/22",
    "All",
  ];
  if (!standingInfo) {
    return null;
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex flex-col">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto flex flex-col">
          <div className="mb-6 flex">
            <Dropdown className="bg-gray-300 rounded-lg border border-gray-500">
              <DropdownTrigger>
                <Button className="border bg-gray-200 border-gray-500 rounded-lg pr-3 pl-3">
                  {" "}
                  Season: {seasons.length > 1 ? "All" : seasons}{" "}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => setChosenSeason(key)}
                className="w-20"
                aria-label="Static Actions"
              >
                {seasonsList.map((season) => (
                  <DropdownItem key={season}>{season}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="my-1 p-2 grid md:grid-cols-12">
            <div className="text-sm flex md:col-span-1 justify-center">#</div>
            <div className="text-sm flex md:col-span-7  ">Team</div>
            <div className="grid md:grid-cols-7 md:col-span-4">
              <div className=" text-sm flex justify-center">P</div>
              <div className=" text-sm flex justify-center">W</div>
              <div className=" text-sm flex justify-center">L</div>
              <div className=" text-sm flex justify-center">D</div>
              <div className=" md:col-span-2 text-sm flex justify-center">
                Goals
              </div>
              <div className=" text-sm flex justify-center">Pts</div>
            </div>
          </div>
          <hr></hr>
          <ul>
            {standingInfo.map((info) => (
              <li>
                <div className="my-3 p-2 grid md:grid-cols-12 rounded-lg bg-gray-100">
                  <div className="text-sm flex items-center md:col-span-1 justify-center ">
                    <span
                      className={`flex items-center justify-center rounded-lg w-5 ${
                        standingInfo.indexOf(info) + 1 === 1
                          ? "bg-golden"
                          : standingInfo.indexOf(info) + 1 === 2
                          ? "bg-silver"
                          : standingInfo.indexOf(info) + 1 === 3
                          ? " bg-bronze"
                          : ""
                      }`}
                    >
                      {standingInfo.indexOf(info) + 1}
                    </span>
                  </div>
                  <div className="text-sm flex md:col-span-7  ">
                    <div className="flex items-center">
                      <Image
                        className="rounded-[50%]"
                        src={`data:image/png;base64,${info.teamLogoUrl}`}
                        width="30"
                        height="30"
                        alt="user"
                      ></Image>
                      <div className="ml-3">{info.team.name}</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-7 md:col-span-4">
                    <div
                      onClick={() => {
                        setChosenTeam(info.team.id);
                        setFinalStatus(["won", "draw", "lost"]);
                        setPageNumber(1);
                      }}
                      className=" text-sm flex items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-300"
                    >
                      {info.drawCount + info.wonCount + info.lostCount}
                    </div>
                    <div
                      onClick={() => {
                        setChosenTeam(info.team.id);
                        setFinalStatus(["won"]);
                        setPageNumber(1);
                      }}
                      className=" text-sm flex items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-300 "
                    >
                      {info.wonCount}
                    </div>
                    <div
                      onClick={() => {
                        setChosenTeam(info.team.id);
                        setFinalStatus(["lost"]);
                        setPageNumber(1);
                      }}
                      className=" text-sm flex items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-300"
                    >
                      {info.lostCount}
                    </div>
                    <div
                      onClick={() => {
                        setChosenTeam(info.team.id);
                        setFinalStatus(["draw"]);
                        setPageNumber(1);
                      }}
                      className="text-sm flex items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-300"
                    >
                      {info.drawCount}
                    </div>
                    <div className=" md:col-span-2 flex justify-center">
                      <div className="text-sm flex items-center rounded bg-green-200 mr-1">
                        {info.scoredGoalsCount}{" "}
                      </div>
                      <div className="text-sm flex items-center rounded bg-red-200">
                        {" "}
                        {info.receivedGoalsCount}
                      </div>
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
    </div>
  );
};

export default TeamsStanding;
