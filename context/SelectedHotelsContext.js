import React, { createContext, useState, useContext } from "react";

const SelectedHotelsContext = createContext();

export const SelectedHotelsProvider = ({ children }) => {
  const [selectedHotels, setSelectedHotels] = useState([]);

  return (
    <SelectedHotelsContext.Provider
      value={{ selectedHotels, setSelectedHotels }}
    >
      {children}
    </SelectedHotelsContext.Provider>
  );
};

export const useSelectedHotels = () => useContext(SelectedHotelsContext);
