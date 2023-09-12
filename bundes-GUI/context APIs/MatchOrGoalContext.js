import React, { createContext, useContext, useState } from 'react';

const MatchOrGoalContext = createContext();

export const useMatchOrGoal = () => {
  return useContext(MatchOrGoalContext);
};

export const MatchOrGoalProvider = ({ children }) => {
  const [matchOrGoal, setMatchOrGoal] = useState("match");

  return (
    <MatchOrGoalContext.Provider value={{ matchOrGoal, setMatchOrGoal }}>
      {children}
    </MatchOrGoalContext.Provider>
  );
};