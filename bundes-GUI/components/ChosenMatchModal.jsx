// components/Modal.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useChosenMatch } from "@/context APIs/ChosenMatchContext";
import Image from "next/image";
import { getMatchEvents } from "@/data_fetchers/home_page_fetchers/match_events_fetcher";
import GoalEvent from "./GoalEvent";
import SubtitutionEvent from "./SubtitutionEvent";
import FoulEvent from "./FoulEvent";

Modal.setAppElement("#__next"); // Set the root element for screen readers (replace #__next with your root element id)

const ChosenMatchModal = ({ isOpen, onClose, children }) => {
  const [sectionToBeShown, setSectionToBeShown] = useState("goals");
  const { chosenMatch, setChosenMatch } = useChosenMatch({});
  useEffect(() => {
  }, [chosenMatch]);

  const [events, setEvents] = useState([]);
  useEffect(() => {
     if (chosenMatch) {
      getMatchEvents(chosenMatch.match.id)
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [chosenMatch?.match.id]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white border border-red-800  rounded-xl  w-1/2 h-3/4 p-3 overflow-auto">
        <div className="flex flex-col p-3 space-y-2">
          <div className="flex items-end justify-end">
            <AiOutlineCloseCircle
              onClick={()=>{onClose();}}
              className="cursor-pointer text-red-800"
            />
          </div>
          <div className="flex justify-center items-center">Match highlights</div>
          {chosenMatch && (
            <div>
              <div
                className={`rounded-lg flex justify-between items-center p-1`}
              >
                <div className="flex w-auto flex-col flex-1  items-center justify-center">
                  <Image
                    className="rounded-[50%]"
                    src={`data:image/png;base64,${chosenMatch.homeTeamLogo}`}
                    width="30"
                    height="30"
                    alt="user"
                  ></Image>
                  <div className="flex items-start justify-start  ">
                    {chosenMatch.match.homeTeam.teamName}
                  </div>
                </div>
                <div className=" flex flex-col   justify-between items-center space-y-3">
                  <div className="text-xs">{chosenMatch.date}</div>
                  <div className="flex justify-between items-center">
                    <div>{chosenMatch.match.homeTeamScore}</div>
                    <div>-</div>
                    <div>{chosenMatch.match.awayTeamScore}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1  items-center justify-center ">
                  <div className="">
                    <Image
                      className="rounded-[50%]"
                      src={`data:image/png;base64,${chosenMatch.awayTeamLogo}`}
                      width="30"
                      height="30"
                      alt="user"
                    ></Image>
                  </div>
                  <div>{chosenMatch.match.awayTeam.teamName}</div>
                </div>
              </div>
            </div>
          )}

          <div className=" border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center  text-gray-500 dark:text-gray-400">
              <li className="mr-2" onClick={() => setSectionToBeShown("goals")}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                    sectionToBeShown === "goals"
                      ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  Goals
                </a>
              </li>
              <li
                className="mr-2"
                onClick={() => setSectionToBeShown("substitutions")}
              >
                <a
                  href="#"
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                    sectionToBeShown === "substitutions"
                      ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                  aria-current="page"
                >
                  Substitutions
                </a>
              </li>
              <li className="mr-2" onClick={() => setSectionToBeShown("fouls")}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                    sectionToBeShown === "fouls"
                      ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  Fouls
                </a>
              </li>
            </ul>
          </div>
          {events && sectionToBeShown === "goals" && (
            <div className="flex flex-col space-y-2">
              {events
                .filter((event) =>
                  ["Goal", "Penalty", "Own goal"].includes(event.title)
                )
                .map((event, i) => (
                  <GoalEvent key={i} event={event}></GoalEvent>
                ))}
            </div>
          )}
          {events && sectionToBeShown === "substitutions" && (
            <div className="flex flex-col space-y-2">
              {events
                .filter((event) => ["Substitution"].includes(event.title))
                .map((event, i) => (
                  <SubtitutionEvent key={i} event={event}></SubtitutionEvent>
                ))}
            </div>
          )}
          {events && sectionToBeShown === "fouls" && (
            <div className="flex flex-col space-y-2">
              {events
                .filter((event) => ["Yellow card","2nd Yellow card (Red)","Red card"].includes(event.title))
                .map((event,i) => (
                  <FoulEvent key={i} event={event}></FoulEvent>
                ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChosenMatchModal;
