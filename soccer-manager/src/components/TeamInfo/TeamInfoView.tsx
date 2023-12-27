import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";
import { ISoccerShirt, ITeamInfoData } from "../../Types";
import { Grid, Typography } from "@mui/material";
import SoccerKitDisplay from "../misc/SoccerKitDisplay";
import FlexiblePaper from "../misc/FlexiblePaper";
import SquadView from "../SquadView";
import AppPaper from "../AppPaper";

interface IProps {
  shirts: ISoccerShirt[];
  teamInfo: ITeamInfoData;
}

function TeamInfoView({ shirts, teamInfo }: IProps) {
  const firstShirt = shirts.find((s) => !s.isSecond);
  const secondShirt = shirts.find((s) => s.isSecond);

  return (
    <>
      <Typography variant="h6">{teamInfo.name}</Typography>
      <Grid container columnGap={"2rem"}>
        <Grid item>
          <FlexiblePaper
            style={{
              maxWidth: "200px",
              height: "200px",
            }}
          >
            <SoccerLogoDisplay
              logoSetup={{
                mainColor: teamInfo.logo.mainColor,
                secondaryColor: teamInfo.logo.secondaryColor,
                type: teamInfo.logo.type,
                name: teamInfo.name,
                iconId: teamInfo.logo.iconId,
              }}
              additionalClasses={["player-soccer-team-logo"]}
            />
            <Typography textAlign={"center"}>{teamInfo.name}</Typography>
            <Typography>----</Typography>
          </FlexiblePaper>
          <Typography>Home kit</Typography>
          <SoccerKitDisplay
            kitSetup={{
              mainColor: firstShirt?.mainColor!,
              secondaryColor: firstShirt?.secondaryColor!,
              type: firstShirt?.type!,
            }}
          />
          <Typography>Away kit</Typography>
          <SoccerKitDisplay
            kitSetup={{
              mainColor: secondShirt?.mainColor!,
              secondaryColor: secondShirt?.secondaryColor!,
              type: secondShirt?.type!,
            }}
          />
        </Grid>
        <Grid item flex={1} minWidth="300px">
          <Typography>Current squad</Typography>
          <AppPaper>
            <SquadView
              formation={teamInfo.formation ?? "4-3-3"}
              squad={teamInfo.players.filter(
                (p) => !p.isInAcademy && p.squadPosition && !p.isBenched
              )}
            ></SquadView>
          </AppPaper>
        </Grid>
      </Grid>
    </>
  );
}

export default TeamInfoView;
