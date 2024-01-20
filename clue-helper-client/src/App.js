import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import { ThemeProvider } from "./contexts/ThemeContex";
import GameSlotList from "./components/Game/GameSlotList";
import ThemeSlotList from "./components/Theme/ThemeSlotList";

function App() {
  return (
    <GameProvider>
      <ThemeProvider>

            <Router>
              <div className="App">
                <Routes>
                  {/* Route for selecting game */}
                  <Route exact path="/" element={<GameSlotList />} />

                  {/* Route for selecting theme or creating a new one */}
                  <Route path="/themes" component={ThemeSlotList} />

                  {/* Route for creating new players */}
                  {/* <Route path="/players" component={PlayerForm} /> */}

                  {/* Route for main game page */}
                  {/* <Route path="/main" component={Main} /> */}
                </Routes>
              </div>
            </Router>
      </ThemeProvider>
    </GameProvider>
  );
}

export default App;
