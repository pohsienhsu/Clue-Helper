import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useGameContext } from "../../contexts/GameContext";
import {
  getRecentIncompleteGames,
  deleteIncompleteGame,
} from "../../services/apiServices";
import GameSlot from "./GameSlot";

import { Container } from "react-bootstrap";

const GameSlotList = () => {
  const [incompleteGames, setIncompleteGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setGameId } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const recentIncompleteGames = await getRecentIncompleteGames();
        console.log("Incomplete games: " + recentIncompleteGames);
        setIncompleteGames(recentIncompleteGames);
        setIsLoading(false); // Assuming setGames is a function in your GameContext to update the games state
      } catch (error) {
        console.error("Error fetching recent incomplete games:", error);
      }
    };

    fetchGames();
  }, [setIncompleteGames, setIsLoading]); // Dependency array ensures this effect runs once on component mount

  const deleteGameSlotHandler = async (gameId) => {
    const deletedGame = await deleteIncompleteGame(gameId);
    console.log("delete game slot: " + deletedGame);
  };

  const selectGameSlotHandler = (gameId) => {
    setGameId(gameId);
    console.log('Navigate to "/main", game slot was selected.')
    navigate('/main');
  };

  const selectNewGameHandler = () => {
    console.log('Navigate to "/theme" for new game.');
    navigate('/theme');
  };

  return (
    <Container>
      {!isLoading && (
        <div>
          <h1>Game Slots</h1>
          <ul>
            {incompleteGames.map((game, idx) => (
              <li key={game.id}>
                <GameSlot
                  newGame={false}
                  idx={idx}
                  game={game}
                  onDelete={deleteGameSlotHandler}
                  onSelect={selectGameSlotHandler}
                />
              </li>
            ))}
            {incompleteGames.length < 3 && (
              <li>
                <GameSlot newGame={true} onSelect={selectNewGameHandler} />
              </li>
            )}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default GameSlotList;
