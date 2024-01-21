import React from "react";

const ThemeSlot = (props) => {
  const deleteThemeSlot = () => {
    const gameId = props.game.id;
    props.onDelete(gameId);
  };

  const selectThemeSlot = () => {
    const gameId = props.game.id;
    props.onSelect(gameId);
  };

  const selectNewTheme = () => {
    props.onSelect();
  };

  return (
    <>
      {props.newGame ? (
        <div onClick={selectNewTheme}>
          <h3>New Game</h3>
        </div>
      ) : (
        <div onClick={selectThemeSlot}>
          <h3>Slot {props.idx}</h3>
          <p>Start Date: {props.game.start_date}</p>
          <div onClick={deleteThemeSlot}>Delete</div>
        </div>
      )}
    </>
  );
};

export default ThemeSlot;
