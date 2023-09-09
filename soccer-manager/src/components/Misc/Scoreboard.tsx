import { Grid, Paper } from "@mui/material";
import { useMemo } from "react";

interface IProps {
  isMyTeamHome: boolean;
  homeScore: number;
  awayScore: number;
}

function Scoreboard({ isMyTeamHome, homeScore, awayScore }: IProps) {
  const getColorsForScores = () => {
    let colors: [string, string] = ["darkslategray", "darkslategray"];

    if (isMyTeamHome) {
      if (homeScore > awayScore) {
        colors = ["yellowgreen", "tomato"];
      } else if (homeScore < awayScore) {
        colors = ["tomato", "yellowgreen"];
      }
    } else {
      if (homeScore > awayScore) {
        colors = ["tomato", "yellowgreen"];
      } else if (homeScore < awayScore) {
        colors = ["yellowgreen", "tomato"];
      }
    }

    return colors;
  };

  const resultColors = useMemo(() => {
    return getColorsForScores();
  }, []);
  
  return (
    <Grid container>
      <Grid flex={4} item>
        <Paper
          sx={{
            padding: "1rem",
            color: resultColors[0]
          }}
        >
          {homeScore}
        </Paper>
      </Grid>
      <Grid flex={4}></Grid>
      <Grid flex={4} item>
        <Paper
          sx={{
            padding: "1rem",
            color: resultColors[1]
          }}
        >
          {awayScore}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Scoreboard;
