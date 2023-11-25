// components/Modal.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import { getTeamImageById } from "@/data_fetchers/home_page_fetchers/team_image_fetcher";
import { getAllTeams } from "@/data_fetchers/home_page_fetchers/teams_fetcher";
import { useOpponents } from "@/context APIs/OpponentsContext";
import {MdSelectAll, MdDeselect} from "react-icons/md";
import { arraysHaveSameElements } from "@/functions/hasTheSameContent";

Modal.setAppElement("#__next"); // Set the root element for screen readers (replace #__next with your root element id)

const ChooseOpponentModal = ({ isOpen, onClose, children }) => {
  const [allOpponents, setAllOpponents] = useState([]);
  const { opponents, setOpponents } = useOpponents([]);
  const [selectedOpponents, setSelectedOpponents] = useState([]);

  useEffect(() => {
    getAllTeams()
      .then((res) => res.json())
      .then((data) => {
        data.map((item) =>
          getTeamImageById(item.id)
            .then((res) => res.json())
            .then((d) => (item["logo"] = d.image))
        );
        setAllOpponents(data);
        setOpponents(data.map((data) => data.id));
        setSelectedOpponents(data.map((data) => data.id));
      });
  }, []);

  const toggleOpponent = (opponent) => {
    if (selectedOpponents.includes(opponent.id)) {
      let indexToRemove = selectedOpponents.indexOf(opponent.id);
      let elementToRemove = selectedOpponents.splice(indexToRemove, 1);
      setSelectedOpponents(selectedOpponents.filter((opponent) => opponent != elementToRemove));
    } else {
      let tempArray = [...selectedOpponents, opponent.id];
      setSelectedOpponents(tempArray);
    }
  };

  const onApply=()=>
  {
    const delay = setTimeout(() => {
      setOpponents(selectedOpponents);
    }, 500);
    return () => clearTimeout(delay); 
  }

  const selectAllOpponents=()=>
  {
    let tempArray = [...selectedOpponents]
    for(const opponent of allOpponents)
    {
      if(!selectedOpponents.includes(opponent.id))
      {
        tempArray.push(opponent.id);
      }
    }
    setSelectedOpponents(tempArray);
  }

  const deSelectAllOpponents=()=>
  {
    for(const opponent of allOpponents)
    {
      if(selectedOpponents.includes(opponent.id))
      {
        let indexToRemove = selectedOpponents.indexOf(opponent.id);
        let elementToRemove = selectedOpponents.splice(indexToRemove, 1);
        setSelectedOpponents(selectedOpponents.filter((opponent) => opponent != elementToRemove));
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white border border-red-800  rounded-xl  w-1/2 h-3/4 p-3 overflow-auto flex flex-col space-y-5">
        <div className="flex justify-center items-center">
          {" "}
          Choose Opponents
        </div>
        <div className="flex justify-end items-center pr-2">
          {allOpponents?.length === selectedOpponents?.length &&<MdDeselect onClick={()=>deSelectAllOpponents()} className="hover:cursor-pointer" size={25}/>}
          {allOpponents?.length !== selectedOpponents?.length &&<MdSelectAll onClick={()=>selectAllOpponents()} className="hover:cursor-pointer" size={25}/>}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {allOpponents.map((opponent, id) => (
            <button
              className={`${
                selectedOpponents.includes(opponent.id) ? "bg-blue-600" : "bg-red-500"
              } text-white font-bold py-2 px-4 rounded`}
              key={id}
              onClick={() => toggleOpponent(opponent)}
              placeholder={opponent.name}
            >
              {opponent.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4 grow">
          {opponents && !arraysHaveSameElements(opponents, selectedOpponents) && <div 
            onClick={() => {onApply(); onClose();}}
            className="flex items-center justify-center border border-green-500 pr-2 pl-2 rounded-lg hover:cursor-pointer"
          >
            <IoCheckmarkDoneSharp className="flex-5 text-green-800" />
            <span className="flex-1">Apply</span>
          </div>}
          <div
            onClick={() => onClose()}
            className="flex items-center justify-center border border-red-500 pr-2 pl-2 rounded-lg hover:cursor-pointer"
          >
            <TiCancel className="flex-5 text-red-800" />
            <span className="flex-1">Close</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseOpponentModal;
