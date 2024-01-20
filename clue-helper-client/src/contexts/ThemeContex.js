import React, {useState, createContext, useContext} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [themeId, setThemeId] = useState(null);

  return (
    <ThemeContext.Provider value={{themeId, setThemeId}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
} 
