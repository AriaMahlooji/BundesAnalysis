import React, { createContext, useContext, useState } from 'react';

const PageNumberContext = createContext();

export const usePageNumber = () => {
  return useContext(PageNumberContext);
};

export const PageNumberProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <PageNumberContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageNumberContext.Provider>
  );
};