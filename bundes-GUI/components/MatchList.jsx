import React from "react";
import Match from "./Match";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import { useTeamId } from "@/context APIs/TeamIdContext";

const MatchList = ({ matches }) => {
  const { pageNumber, setPageNumber } = usePageNumber();
  const { teamId, setTeamId} = useTeamId();
  const goNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const goPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  if(!matches)
  {
    return;
  }
  return (
    (<div className="rounded-lg p-2 bg-white space-y-2 flex flex-col">
      <h2 className="flex justify-center">Matches</h2>
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
      <ul className="space-y-2">
        {matches.map((match, i) => (
          <li key={i}>
            <Match key={i} chosenTeamId={teamId} match={match}></Match>
          </li>
        ))}
      </ul>
    </div>)
  );
};

export default MatchList;
