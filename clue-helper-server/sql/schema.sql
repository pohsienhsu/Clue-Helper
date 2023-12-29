-- Create Themes Table
CREATE TABLE Themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create Characters Table
CREATE TABLE Characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  theme_id INT REFERENCES Themes(id)
);

-- Create Items Table
CREATE TABLE Items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  theme_id INT REFERENCES Themes(id)
);

-- Create Locations Table
CREATE TABLE Locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  theme_id INT REFERENCES Themes(id)
);

-- Create Games Table
CREATE TABLE Games (
  id SERIAL PRIMARY KEY,
  theme_id INT REFERENCES Themes(id),
  status ENUM('complete', 'incomplete') DEFAULT 'incomplete',
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Players Table
CREATE TABLE Players (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES Games(id),
  name VARCHAR(255) NOT NULL
);

-- Create Questions Table
CREATE TABLE Questions (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES Games(id),
  player_id INT REFERENCES Players(id),
  q_character_id INT REFERENCES Characters(id),
  q_item_id INT REFERENCES Items(id),
  q_location_id INT REFERENCES Locations(id),
  shown_card BOOLEAN NOT NULL,
  shown_by_player_id INT REFERENCES Players(id),
  question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create Turns Table
CREATE TABLE Turns (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES Games(id),
  player_id INT REFERENCES Players(id),
  question_id INT REFERENCES Questions(id),
  turn_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
