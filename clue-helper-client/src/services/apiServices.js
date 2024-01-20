import axios from "axios";

const API_BASE_URL = "http://localhost:8080/graphql"; // Replace with your backend URL

export const getRecentIncompleteGames = async () => {
  try {
    const response = await axios.post(API_BASE_URL, {
      query: `
        query {
          getRecentIncompleteGames(limit: 3) {
            id
            theme_id
            status
            start_date
          }
        }
      `,
    });

    return response.data.data.getRecentIncompleteGames;
  } catch (error) {
    console.error("Error fetching recent incomplete games:", error);
    throw error;
  }
};


export const deleteIncompleteGame = async (gameId) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      query: `
        query {
          deleteIncompleteGames(game_id: ${gameId}) {
            id
            theme_id
            status
            start_date
          }
        }
      `,
    });

    return response.data.data.deleteIncompletGame;
  } catch (error) {
    console.error("Error delete incomplete game (" + gameId + ")." , error);
    throw error;
  }
};


export const getAllThemes = async () => {
  try {
    const response = await axios.post(API_BASE_URL, {
      query: `
        query {
          getAllThemes {
            id
            name
          }
        }
      `
    })
    return response.data.data.getAllThemes;
  } catch (error) {
    console.error("Error getting all themes", error);
    throw error;
  }
}
