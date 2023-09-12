import React, { createContext, useContext, useState } from 'react';

const GoalContext = createContext();

export const useGoal = () => {
  return useContext(GoalContext);
};

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  return (
    <GoalContext.Provider value={{ goals, setGoals}}>
      {children}
    </GoalContext.Provider>
  );
};