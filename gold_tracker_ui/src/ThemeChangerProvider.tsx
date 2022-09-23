import { PaletteMode } from "@mui/material";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { manageThemes } from "./AppTheme";

interface themeContextType {
  theme: PaletteMode;
  toggleTheme: () => void;
}

let themeContext = React.createContext<themeContextType>(null!);

export function ThemeChangerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<PaletteMode>("dark");

  let toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  let value = { theme, toggleTheme };
  return (
    <themeContext.Provider value={value}>
      <ThemeProvider theme={manageThemes(theme)}>{children}</ThemeProvider>
    </themeContext.Provider>
  );
}

export function useThemeChanger() {
  return React.useContext(themeContext);
}
