/* ****************************************************************
Games
**************************************************************** */

// Get the most recent incomplete games
const getRecentIncompleteGames = async (_, args, { db }) => {
  const { limit } = args;
  const query = `
    SELECT * FROM games
    ORDER BY start_date DESC
    LIMIT $1;
  `;
  return await db.any(query, [limit]);
};

// Create a new game (if there isn't already 3 incomplte games)
const createGame = async (_, args, { db }) => {
  const { theme_id } = args.input;
  const query = `
    INSERT INTO games (theme_id)
    VALUES ($1)
    RETURNING *
  `;
  return await db.one(query, [theme_id]);
};

// Delete an incomplete game
const deleteIncompleteGame = async (_, args, { db }) => {
  const { game_id } = args;

  // Check if the game with the specified ID exists and has an 'incomplete' status
  const checkQuery = `
    SELECT * FROM games
    WHERE id = $1 AND status = 'incomplete';
  `;

  const game = await db.oneOrNone(checkQuery, [game_id]);

  if (!game) {
    throw new Error("Incomplete game not found or already completed.");
  }

  // Delete the game with the specified ID
  const deleteQuery = `
    DELETE FROM games
    WHERE id = $1
    RETURNING *;
  `;

  return await db.one(deleteQuery, [game_id]);
};

/* ****************************************************************
Themes
**************************************************************** */

// Show all available themes for a new game (max 5)
const getAllThemes = async (_, __, { db }) => {
  const query = `
  SELECT * FROM themes;
  `;
  return await db.any(query);
};

/* ****************************************************************
Players
**************************************************************** */

// Show all players for the current game
const getAllPlayersForTheGame = async (_, args, { db }) => {
  const { game_id } = args;
  const query = `
    SELECT * FROM Players
    WHERE game_id = $1
  `;
  return await db.any(query, [game_id]);
};

// Create players for a new game
const createPlayer = async (_, args, { db }) => {
  const { game_id, name } = args.input;
  const query = `
    INSERT INTO Players (game_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  return await db.one(query, [game_id, name]);
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

const createQuestion = async (_, args, { db }) => {
  const {
    game_id,
    player_id,
    q_character_id,
    q_item_id,
    q_location_id,
    shown_card,
    shown_by_player_id,
  } = args.input;
  const query = `
    INSERT INTO Questions (game_id, player_id, q_character_id, q_item_id, q_location_id, shown_card, shown_by_player_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  return await db.one(query, [
    game_id,
    player_id,
    q_character_id,
    q_item_id,
    q_location_id,
    shown_card,
    shown_by_player_id,
  ]);
};

const createTurn = async (_, args, { db }) => {
  const { game_id, player_id, question_id } = args.input;
  const query = `
    INSERT INTO Turns (game_id, player_id, question_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return await db.one(query, [game_id, player_id, question_id]);
};

// Resolvers for PlayerCards and RuledOutCards
const createCard = async (_, args, { db }) => {
  const { name, theme_id, type } = args.input;
  const query = `
    INSERT INTO cards (name, theme_id, type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return await db.one(query, [name, theme_id, type]);
};

const getAllCards = async (_, args, { db }) => {
  const { theme_id  } = args.input;
  const query = `
    SELECT * FROM cards
    WHERE theme_id = $1;
  `;
  return await db.one(query, [theme_id]);
};


const createPlayerCard = async (_, args, { db }) => {
  const { game_id, player_id, card_id } = args.input;
  const query = `
    INSERT INTO PlayerCards (game_id, player_id, card_id))
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return await db.one(query, [
    game_id,
    player_id,
    card_id,
  ]);
};

const createRuledOutCard = async (_, args, { db }) => {
  const {
    game_id,
    player_id,
    card_id,
    source_question_id,
  } = args.input;
  const query = `
    INSERT INTO RuledOutCards (game_id, player_id, card_id, source_question_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return await db.one(query, [
    game_id,
    player_id,
    card_id,
    source_question_id,
  ]);
};

const getPlayerCards = async (_, args, { db }) => {
  const { game_id, player_id } = args;
  const query = `
    SELECT * FROM playercards
    WHERE game_id = $1 and player_id = $2;
  `;
  return await db.any(query, [game_id, player_id]);
};

const getRuledOutCards = async (_, args, { db }) => {
  const { game_id, player_id } = args;
  const query = `
    SELECT * FROM ruledoutcards
    WHERE game_id = $1 and player_id = $2;
  `;
  return await db.any(query, [game_id, player_id]);
};

module.exports = {
  Query: {
    getRecentIncompleteGames,
    getAllThemes,
    getAllPlayersForTheGame,
    getAllCards,
    getPlayerCards,
    getRuledOutCards,
  },
  Mutation: {
    createGame,
    deleteIncompleteGame,
    createPlayer,
    editPlayer,
    createQuestion,
    createTurn,
    createCard,
    createPlayerCard,
    createRuledOutCard,
  },
};
