import React from "react";

const GameSlot = (props) => {

  const deleteGameSlot = () => {
    const gameId = props.game.id;
    props.onDelete(gameId);
  }

  const selectGameSlot = () => {
    const gameId = props.game.id;
    props.onSelect(gameId);
  }

  const selectNewGame = () => {
    props.onSelect();
  }

  return (
    <>
      {props.newGame ? (
        <div onClick={selectNewGame}>
          <h3>New Game</h3>
        </div>
      ) : (
        <div onClick={selectGameSlot}>
          <h3>Slot {props.idx}</h3>
          <p>Start Date: {props.game.start_date}</p>
          <div onClick={deleteGameSlot}>Delete</div>
        </div>
      )}
    </>
  );
};

export default GameSlot;
