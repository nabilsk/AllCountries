import React, {createContext, useState, useContext, useEffect} from 'react';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'appTheme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme !== null) {
        setIsDarkTheme(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async value => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    saveThemePreference(newTheme);
  };

  const setTheme = isDark => {
    setIsDarkTheme(isDark);
    saveThemePreference(isDark);
  };

  const paperTheme = isDarkTheme ? PaperDarkTheme : PaperDefaultTheme;

  const theme = {
    ...paperTheme,
    // Add your custom theme properties here if needed
    // For example, you can define custom colors, fonts, etc.
  };

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme, setTheme}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
