// components/Modal.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { EvaluatedSubstitutionChart } from "./EvaluatedSubstitutionChart";
import { useChosenEvaluatedSubstitution } from "@/context APIs/ChosenEvaluatedSubstitution";
import MatchHighlight from "./MatchHighlight";

Modal.setAppElement("#__next"); // Set the root element for screen readers (replace #__next with your root element id)

const EvaluatedSubstitutionModal = ({ isOpen, onClose, children }) => {
  const [sectionToBeShown, setSectionToBeShown] = useState("analysis");
  const { chosenEvaluatedSubstitution, setChosenEvaluatedSubstitution } =
    useChosenEvaluatedSubstitution();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white border border-red-800  rounded-xl  w-1/2 h-3/4 p-3 overflow-auto flex flex-col space-y-5">
        <div className=" flex items-end justify-end">
          <AiOutlineCloseCircle
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer text-red-800"
          />
        </div>
        <div className=" border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center  text-gray-500 dark:text-gray-400">
            <li
              className="mr-2"
              onClick={() => setSectionToBeShown("analysis")}
            >
              <a
                href="#"
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                  sectionToBeShown === "analysis"
                    ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } group`}
                aria-current="page"
              >
                Analysis
              </a>
            </li>
            <li className="mr-2" onClick={() => setSectionToBeShown("match")}>
              <a
                href="#"
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                  sectionToBeShown === "match"
                    ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } group`}
              >
                Match
              </a>
            </li>
          </ul>
        </div>
        {sectionToBeShown === "analysis" && (
          <div>
            <EvaluatedSubstitutionChart
              positiveMetrics={chosenEvaluatedSubstitution?.positiveMetrics}
              negativeMetrics={chosenEvaluatedSubstitution?.negativeMetrics}
            />
          </div>
        )}
        {sectionToBeShown === "match" && (
          <div>
            <MatchHighlight matchId={chosenEvaluatedSubstitution?.event.matchId}/>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EvaluatedSubstitutionModal;
