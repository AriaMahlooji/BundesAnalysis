import React, { useEffect, useState } from "react";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import { useSeason } from "@/context APIs/SeasonHomePageContext";
import { useTeamId } from "@/context APIs/TeamIdContext";
import { useEventType } from "@/context APIs/EventTypeContext";
import { CiSearch } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import { SecondYellowCard } from "@/SVGs/SecondYellowCard";
import { BiFootball } from "react-icons/bi";
import { VscListFilter } from "react-icons/vsc";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import CustomSearch from "./CustomSearch";
import { useOpponentsModalIsOpen } from "@/context APIs/OpponentModalVisibilityContext";

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

const eventTypes = ["Goals", "Subs", "Fouls"];

const Criterias = () => {
  const { seasons, setSeasons } = useSeason();
  const { pageNumber, setPageNumber } = usePageNumber();
  const { eventType, setEventType } = useEventType();
  const [eventTitle, setEventTitle] = useState("Goals");
  const { opponentsModalIsOpen, setOpponentsModalIsOpen } =
    useOpponentsModalIsOpen(false);

  const onSetEvents = (type) => {
    setEventTitle(type);
    if (type === "Goals") setEventType(["Goal", "Penalty", "Own goal"]);
    if (type === "Subs") setEventType(["Substitution"]);
    if (type === "Fouls")
      setEventType(["Yellow card", "Red card", "2nd Yellow card (Red)"]);
  };

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

  useEffect(() => {
    if (eventType.includes("Goal")) setEventTitle("Goals");
    if (eventType.includes("Substitution")) setEventTitle("Subs");
    if (eventType.includes("Yellow card")) setEventTitle("Fouls");
  }, [eventType]);

  return (
    <div className="flex w-full space-x-5 p-2 ">
      <div className="mb-6 flex items-center justif border bordet-gray-900 rounded-lg  bg-gray-300">
        <div className="flex flex-grow w-1/5 items-center justify-center">
          <CiSearch></CiSearch>
        </div>
        <div className="flex flex-grow w-4/5">
          <CustomSearch></CustomSearch>
        </div>
      </div>
      <div className="mb-6 flex border bg-gray-200 border-gray-500 rounded-lg hover:cursor-pointer">
        <Dropdown className="bg-gray-300 rounded-lg border border-gray-500">
          <DropdownTrigger>
            <div className="flex justify-center items-center">
              <Button className="w-32 pr-3 pl-3">
                {" "}
                Season: {seasons.length > 1 ? "All" : seasons}{" "}
              </Button>
              <BiChevronDown size={30} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => setChosenSeason(key)}
            className="w-20"
            aria-label="Static Actions"
          >
            {seasonsList.map((season, i) => (
              <DropdownItem
                className="p-1 hover:bg-white hover:rounded-lg"
                key={season}
              >
                {season}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mb-6 flex border bg-gray-200 border-gray-500 rounded-lg hover:cursor-pointer">
        <Dropdown className="bg-gray-300 rounded-lg border border-gray-500">
          <DropdownTrigger>
            <div className="flex justify-center items-center">
              <Button className="w-32 pr-3 pl-3">Event: {eventTitle}</Button>
              <BiChevronDown size={30} />
            </div>
          </DropdownTrigger>
          <DropdownMenu className="w-auto" aria-label="Static Actions">
            {eventTypes.map((eT, i) => (
              <DropdownItem
                onClick={() => onSetEvents(eT)}
                className=" hover:bg-white hover:rounded-lg"
                key={eT}
                defaultChecked={eT === "Substitutions"}
              >
                <div className="flex items-center space-x-2">
                  <div>
                    {eT === "Subs" ? (
                      <TbArrowsExchange />
                    ) : eT === "Fouls" ? (
                      <SecondYellowCard />
                    ) : (
                      <BiFootball />
                    )}
                  </div>
                  <div>{eT}</div>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        onClick={() => {
          setOpponentsModalIsOpen(true);
          console.log(opponentsModalIsOpen);
        }}
        className="flex items-center justify-between w-32 mb-6  bg-gray-200 p-2 rounded-lg border border-gray-500 hover:cursor-pointer"
      >
        <Button>Opponents</Button>
        <div className="flex items-center justify-center">
          <VscListFilter />
        </div>
      </div>
    </div>
  );
};

export default Criterias;
