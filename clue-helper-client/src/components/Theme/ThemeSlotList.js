import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeContext";
import {
  getAllThemes
} from "../../services/apiServices";
import ThemeSlot from "./ThemeSlot";

import { Container } from "react-bootstrap";

const ThemeSlotList = () => {
  const [availableThemes, setAvailableThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setThemeId } = useThemeContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const allAvailableThemes = await getAllThemes();
        console.log("themes: " + allAvailableThemes);
        setAvailableThemes(allAvailableThemes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching all themes", error);
      }
    };

    fetchGames();
  }, [setAvailableThemes, setIsLoading]);

  const deleteThemeSlotHandler = (themeId) => {

  }

  const selectThemeSlotHandler = (themeId) => {
    setThemeId(themeId);
    navigate("/main");
  }

  const selectNewThemeHandler = () => {
    navigate("/cards");
  }

  return (
    <Container>
      {!isLoading && (
        <div>
          <h1>Game Slots</h1>
          <ul>
            {availableThemes.map((theme, idx) => (
              <li key={theme.id}>
                <ThemeSlot
                  newTheme={false}
                  onDelete={deleteThemeSlotHandler}
                  onSelect={selectThemeSlotHandler}
                />
              </li>
            ))}
            {availableThemes.length < 3 && (
              <li>
                <ThemeSlot newTheme={true} onSelect={selectNewThemeHandler} />
              </li>
            )}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default ThemeSlotList;
