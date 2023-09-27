import { Grid } from "@mui/material";
import MatchCentrePaper from "./MatchCentrePaper";

function MatchCentreView() {
  return (
    <Grid container flexDirection={"row"}>
      <Grid item flex={6}>
        <MatchCentrePaper teamId={1} teamName="Team 1" />
      </Grid>
      <Grid item flex={6}>
        <MatchCentrePaper teamId={2} teamName="Team 2" />
      </Grid>
    </Grid>
  );
}

export default MatchCentreView;
