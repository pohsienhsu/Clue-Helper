DROP DATABASE IF EXISTS cluehelper_db;
CREATE DATABASE cluehelper_db;
\c cluehelper_db

-- Create Themes Table
CREATE TABLE themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create card Table
CREATE TYPE card_type AS ENUM ('character', 'item', 'location');
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  theme_id INT REFERENCES themes(id),
  type card_type NOT NULL
);

-- Create games Table
CREATE TYPE game_status AS ENUM ('complete', 'incomplete');
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  theme_id INT REFERENCES themes(id),
  status game_status NOT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create players Table
CREATE TYPE player_role AS ENUM ('main', 'opponent');
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  name VARCHAR(255) NOT NULL,
  sequence INT NOT NULL,
  role player_role NOT NULL
);

-- Create questions Table
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  player_id INT REFERENCES players(id),
  q_character_id INT REFERENCES cards(id),
  q_item_id INT REFERENCES cards(id),
  q_location_id INT REFERENCES cards(id),
  shown_card BOOLEAN NOT NULL,
  shown_by_player_id INT REFERENCES players(id),
  question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create turns Table
CREATE TABLE turns (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  player_id INT REFERENCES players(id),
  question_id INT REFERENCES questions(id),
  turn_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- The cards a player has and confirmed
CREATE TABLE playercards (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  player_id INT REFERENCES players(id),
  card_id INT REFERENCES cards(id)
);


-- The cards a player doesn't have for sure
CREATE TABLE ruledoutcards (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  player_id INT REFERENCES players(id),
  card_id INT REFERENCES cards(id),
  source_question_id INT REFERENCES questions(id)
);

