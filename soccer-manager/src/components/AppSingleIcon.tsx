import { IconImage } from "../Types";
import { Card, Grid } from "@mui/material";

interface IProps extends IconImage {
  chosenIconId: string;
  setChosenIconId: (iconId: string) => void;
}

function AppSingleIcon({ id, icon, chosenIconId, setChosenIconId }: IProps) {
  return (
    <Card className="app-single-icon">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        padding="0.5rem"
        onClick={() => {
          setChosenIconId(id);
        }}
      >
        {icon({
          fontSize: "1.25rem",
          color: id === chosenIconId ? "#228b22" : "#1a1110",
        })}
      </Grid>
    </Card>
  );
}

export default AppSingleIcon;
