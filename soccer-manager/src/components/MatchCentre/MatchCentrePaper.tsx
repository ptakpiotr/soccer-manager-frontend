import AppPaper from "../AppPaper";
import { Grid, Typography } from "@mui/material";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";
import { SoccerShirtType } from "../../Types";
import SquadView from "../SquadView";
import { useNavigate } from "react-router-dom";

interface IProps {
  teamId: number;
  teamName: string;
}

function MatchCentrePaper({ teamId, teamName }: IProps) {
  const navigate = useNavigate();

  const handleClick = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <AppPaper>
      <Grid
        container
        alignItems={"center"}
        columnGap={"1rem"}
        onClick={() => {
          handleClick(teamId);
        }}
      >
        <SoccerLogoDisplay
          logoSetup={{
            mainColor: "#0000FF",
            secondaryColor: "#FF0000",
            type: SoccerShirtType.STRIPES_SIMPLE,
            name: "AFC",
            iconId: "gi-chicken",
          }}
          additionalClasses={["player-soccer-team-logo"]}
        />
        <Typography component="span" variant="h6">
          {teamName}
        </Typography>
      </Grid>
      <SquadView formation={"4-3-3"}></SquadView>
    </AppPaper>
  );
}

export default MatchCentrePaper;
