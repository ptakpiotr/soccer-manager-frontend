import { IconImage } from "../Types";
import AppSingleIcon from "./AppSingleIcon";
import { Grid } from "@mui/material";

interface IProps {
  icons: IconImage[];
  chosenIconId: string;
  setChosenIconId: (iconId: string) => void;
}

function AppIconPicker({ icons, chosenIconId, setChosenIconId }: IProps) {
  return (
    <Grid container columnGap="0.25rem">
      {icons.map((i) => (
        <Grid key={i.id} flex={1} item>
          <AppSingleIcon
            {...i}
            chosenIconId={chosenIconId}
            setChosenIconId={setChosenIconId}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default AppIconPicker;
