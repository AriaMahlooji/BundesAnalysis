import React, { useState } from "react";
import EvaluatedSubstitution from "./EvaluatedSubstitution";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { useAscending } from "@/context APIs/AscendingContext";
import { CircularProgress } from '@mui/material';
import { useChosenEvaluatedSubstitution } from "@/context APIs/ChosenEvaluatedSubstitution";
const EvaluatedSubstitutionsList = ({ evaluatedSubstitutions, isLoading }) => {
  const { pageNumber, setPageNumber } = usePageNumber();
  const { ascending, setAscending } = useAscending();

  const goNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const goPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const toggleAscending = () => {
    if (ascending === "false") setAscending("true");
    else setAscending("false");
    setPageNumber(1);
  };

  return (
    <div className="rounded-lg p-2 bg-white space-y-2 flex flex-col">
      <h2 className="flex justify-center">Substitutions</h2>
      <div className="flex items-center justify-between">
        {pageNumber !== 1 && (
          <div
            onClick={goPreviousPage}
            className="flex flex-1 items-center justify-center hover:cursor-pointer"
          >
            <AiOutlineCaretLeft />
            Previous
          </div>
        )}
        {pageNumber === 1 && <div className="flex-1"></div>}
        <div className="flex flex-1 items-center justify-center hover:cursor-pointer">
          {ascending==="true" && (
            <HiOutlineSortAscending
              onClick={() => toggleAscending()}
              size={25}
            />
          )}
          {ascending==="false" && (
            <HiOutlineSortDescending
              onClick={() => toggleAscending()}
              size={25}
            />
          )}
        </div>
        {pageNumber === 1 && <div></div>}
        <div
          onClick={goNextPage}
          className="flex flex-1 items-center justify-center hover:cursor-pointer"
        >
          Next
          <AiOutlineCaretRight />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {!isLoading && evaluatedSubstitutions.map((evaluatedSubstitution, i) => (
          <EvaluatedSubstitution key={i} substitution={evaluatedSubstitution} />
        ))}
        {isLoading && <div className="min-h-screen flex items-center justify-center"><CircularProgress/></div>}
      </div>
    </div>
  );
};

export default EvaluatedSubstitutionsList;
