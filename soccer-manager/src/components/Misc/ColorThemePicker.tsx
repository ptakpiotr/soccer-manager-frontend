import { Grid } from "@mui/material";
import Globals from "../../Globals";
import ColorSingleItem from "./ColorSingleItem";
import { useContext } from "react";
import { UserSettingsContext } from "../../context";

function ColorThemePicker() {
  const { navbarColor, setNavbarColor } = useContext(UserSettingsContext);

  const setColor = (color: typeof navbarColor) => {
    if (setNavbarColor) {
      setNavbarColor(color!);
    }
  };
  return (
    <Grid container columnGap="0.25rem" width="fit-content">
      {Globals.availableColors.map((i) => (
        <Grid key={`color-${i}`} item>
          <ColorSingleItem color={i} setColor={setColor} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ColorThemePicker;
