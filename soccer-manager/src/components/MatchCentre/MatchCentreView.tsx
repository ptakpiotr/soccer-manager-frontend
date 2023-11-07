import { Alert, Grid } from "@mui/material";
import MatchCentrePaper from "./MatchCentrePaper";
import Scoreboard from "../misc/Scoreboard";
import { GroundType, IMatchCalendarInfo } from "../../Types";

type Props = Omit<IMatchCalendarInfo, "matchType">;

function MatchCentreView({
  homeTeamId,
  awayTeamId,
  ground,
  homeScore,
  awayScore,
}: Props) {
  return (
    <>
      {homeScore && awayScore ? (
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Scoreboard
              isMyTeamHome={ground === GroundType.HOME}
              awayScore={homeScore}
              homeScore={awayScore}
            />
          </Grid>
        </Grid>
      ) : (
        <Alert variant="standard" color="info">
          Match yet to be played
        </Alert>
      )}
      <Grid container flexDirection={"row"}>
        <Grid item flex={6}>
          <MatchCentrePaper teamId={homeTeamId} />
        </Grid>
        <Grid item flex={6}>
          <MatchCentrePaper teamId={awayTeamId} />
        </Grid>
      </Grid>
    </>
  );
}

export default MatchCentreView;
