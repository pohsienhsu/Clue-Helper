/* ****************************************************************
Games
**************************************************************** */

// Get the most recent incomplete games
const getRecentIncompleteGames = async (_, args, { db }) => {
  const { limit } = args;
  const query = `
    SELECT * FROM Games
    ORDER BY start_date DESC
    LIMIT $1;
  `;
  return await db.any(query, [limit]);
};

// Create a new game (if there isn't already 3 incomplte games)
const createGame = async (_, args, { db }) => {
  const { themeId } = args.input;
  const query = `
    INSERT INTO Games (theme_id)
    VALUES ($1)
    RETURNING *
  `;
  return await db.one(query, [themeId]);
};

// Delete an incomplete game
const deleteIncompleteGame = async (_, args, { db }) => {
  const { gameId } = args;

  // Check if the game with the specified ID exists and has an 'incomplete' status
  const checkQuery = `
    SELECT * FROM Games
    WHERE id = $1 AND status = 'incomplete';
  `;

  const game = await db.oneOrNone(checkQuery, [gameId]);

  if (!game) {
    throw new Error("Incomplete game not found or already completed.");
  }

  // Delete the game with the specified ID
  const deleteQuery = `
    DELETE FROM Games
    WHERE id = $1
    RETURNING *;
  `;

  return await db.one(deleteQuery, [gameId]);
};

/* ****************************************************************
Themes
**************************************************************** */

// Show all available themes for a new game (max 5)
const getAllThemes = async (_, __, { db }) => {
  const query = `
  SELECT * FROM Themes;
  `;
  return await db.any(query);
};

// Create a new theme with characters, items, and locations

/* ****************************************************************
Players
**************************************************************** */

// Show all players for the current game
const getAllPlayersForTheGame = async (_, args, { db }) => {
  const { gameId } = args;
  const query = `
    SELECT * FROM Players
    WHERE game_id = $1
  `;
  return await db.any(query, [gameId]);
};

// Create players for a new game
const createPlayer = async (_, args, { db }) => {
  const { gameId, name } = args.input;
  const query = `
    INSERT INTO Players (game_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  return await db.one(query, [gameId, name]);
};

// Edit player
const editPlayer = async (_, args, { db }) => {
  const { id, input } = args;
  const { name } = input;
  const query = `
    UPDATE Players
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;
  return await db.one(query, [name, id]);
};

/* ****************************************************************
Turns
**************************************************************** */

const recordQuestion = async (_, args, { db }) => {
  const { gameId, playerId, qCharacter, qItem, qLocation, shown, shownByPlayerId } = args.input;
  const query = `
    INSERT INTO Questions (game_id, player_id, qCharacter, qItem, qLocation, shown, shownByPlayerId)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  return await db.one(query, [gameId, playerId, qCharacter, qItem, qLocation, shown, shownByPlayerId]);
};


const recordTurn = async (_, args, { db }) => {
  const { gameId, playerId, questionId } = args.input;
  const query = `
    INSERT INTO Turns (game_id, player_id, question_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return await db.one(query, [gameId, playerId, questionId]);
};


module.exports = {
  Query: {
    getRecentIncompleteGames,
    getAllThemes,
    getAllPlayersForTheGame
  },
  Mutation: {
    createGame,
    deleteIncompleteGame,
    createPlayer,
    editPlayer,
    recordQuestion,
    recordTurn
  },
};
