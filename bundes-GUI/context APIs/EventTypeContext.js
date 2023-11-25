import React, { createContext, useContext, useState } from 'react';

const EventTypeContext = createContext();

export const useEventType = () => {
  return useContext(EventTypeContext);
};

export const EventTypeProvider = ({ children }) => {
  const [eventType, setEventType] = useState(["Goal", "Penalty", "Own goal"]);

  return (
    <EventTypeContext.Provider value={{ eventType, setEventType }}>
      {children}
    </EventTypeContext.Provider>
  );
};