import { IconButton, useTheme } from "@mui/material";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeChanger } from "../../../ThemeChangerProvider";

const ToggleButton = () => {
    const theme = useTheme();
    const themeChanger = useThemeChanger();
    console.log(themeChanger.theme);
    return(
        <IconButton sx={{ ml: 1 }} onClick={() => themeChanger.toggleTheme()} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
};

export function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  return mode;
}

export default ToggleButton;