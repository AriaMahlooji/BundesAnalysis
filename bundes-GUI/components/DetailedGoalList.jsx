import React, { useState } from "react";
import DetailedGoal from "./DetailedGoal";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { useSide } from "@/context APIs/SideContext";


const DetailedGoalList = ({goals}) => {
  const {side, setSide} = useSide();
  let sortedGoals = goals.sort((a, b) => {
    if (a.matchId === b.matchId) {
      const minuteA = parseInt(a.eventDetail.split("'")[0]);
      const minuteB = parseInt(b.eventDetail.split("'")[0]);
      return minuteA - minuteB;
    } else {
      return a.matchId - b.matchId;
    }
  });
  const {pageNumber, setPageNumber} = usePageNumber();

  const goNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const goPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  
  if(!goals)
  {
    return
  }

  return (
    <div className="rounded-lg p-2 bg-white space-y-2 flex flex-col">
      <h2 className="flex justify-center">{side==='by'? "Scored": "Received"} Goals</h2>
      <div className="flex items-center justify-between">
        {pageNumber !== 1 && (
          <div
            onClick={goPreviousPage}
            className="flex items-center justify-center hover:cursor-pointer"
          >
            <AiOutlineCaretLeft />
            Pevious
          </div>
        )}
        {pageNumber === 1 && <div></div>}
        <div
          onClick={goNextPage}
          className="flex items-center justify-center hover:cursor-pointer"
        >
          Next
          <AiOutlineCaretRight />
        </div>
      </div>
    <div className="bg-white flex flex-col space-y-2 p-2 rounded-lg">
      {goals.map((goal, i)=>(
        <DetailedGoal key={i} goal={goal}/>
      ))}
    </div>
    </div>
  );
};

export default DetailedGoalList;
