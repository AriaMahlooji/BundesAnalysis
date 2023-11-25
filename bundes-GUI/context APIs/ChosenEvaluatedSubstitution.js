import React, { createContext, useContext, useState } from 'react';

const ChosenEvaluatedSubstitutionContext = createContext();

export const useChosenEvaluatedSubstitution = () => {
  return useContext(ChosenEvaluatedSubstitutionContext);
};

export const ChosenEvaluatedSubstitutionProvider = ({ children }) => {
  const [chosenEvaluatedSubstitution, setChosenEvaluatedSubstitution] = useState();

  return (
    <ChosenEvaluatedSubstitutionContext.Provider value={{ chosenEvaluatedSubstitution, setChosenEvaluatedSubstitution}}>
      {children}
    </ChosenEvaluatedSubstitutionContext.Provider>
  );
};