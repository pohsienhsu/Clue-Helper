import React, { createContext, useState, useContext } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);

  return (
    <GameContext.Provider value={{ gameId, setGameId }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
