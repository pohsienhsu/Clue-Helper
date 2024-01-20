import React, { createContext, useState, useContext } from "react";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  return useContext(PlayersContext);
};
