import { Grid } from "@mui/material";
import MatchCentrePaper from "./MatchCentrePaper";
import Scoreboard, { IProps as ScoreboardProps } from "../misc/Scoreboard";

interface IProps extends ScoreboardProps {}

function MatchCentreView({ isMyTeamHome, awayScore, homeScore }: IProps) {
  return (
    <>
      <Grid container flexDirection={"row"}>
        <Grid item flex={6}>
          <MatchCentrePaper teamId={1} teamName="Team 1" />
        </Grid>
        <Grid item flex={6}>
          <MatchCentrePaper teamId={2} teamName="Team 2" />
        </Grid>
      </Grid>
      {homeScore ? (
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Scoreboard isMyTeamHome={true} awayScore={12} homeScore={20} />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default MatchCentreView;
