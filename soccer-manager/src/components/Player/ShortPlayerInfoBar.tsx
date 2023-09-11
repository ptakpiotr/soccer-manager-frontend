import { Card, Grid, Typography } from "@mui/material";
import { IShortTeamInfo } from "../../Types";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";

type Props = Pick<IShortTeamInfo, "teamLogo"> & {
  playerName: string;
  playerNumber: number;
};

function ShortPlayerInfoBar({ playerName, playerNumber, teamLogo }: Props) {
  return (
    <Grid container flexDirection="row" alignItems="center" columnGap="0.5rem">
      <Grid item>
        <Card className="short-player-info-number">{playerNumber}</Card>
      </Grid>
      <Grid flex={1} item>
        <Typography variant="h6">{playerName}</Typography>
      </Grid>
      <Grid item>
        <SoccerLogoDisplay
          logoSetup={teamLogo}
          additionalClasses={["player-soccer-team-logo"]}
        />
      </Grid>
    </Grid>
  );
}

export default ShortPlayerInfoBar;
