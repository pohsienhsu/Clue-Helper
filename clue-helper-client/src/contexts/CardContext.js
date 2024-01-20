import React, { createContext, useState, useContext } from "react";

export const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = () => {
  return useContext(CardsContext);
};
