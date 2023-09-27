import React from "react";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";
import { SoccerShirtType } from "../../Types";
import { Grid, Typography } from "@mui/material";
import SoccerKitDisplay from "../misc/SoccerKitDisplay";
import FlexiblePaper from "../misc/FlexiblePaper";
import SquadView from "../SquadView";
import AppPaper from "../AppPaper";

function TeamInfoView() {
  return (
    <>
      <Typography variant="h6">FCK Soccer</Typography>
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
                mainColor: "#0000FF",
                secondaryColor: "#FF0000",
                type: SoccerShirtType.STRIPES_SIMPLE,
                name: "AFC",
                iconId: "gi-chicken",
              }}
              additionalClasses={["player-soccer-team-logo"]}
            />
            <Typography textAlign={"center"}>FCK Soccer</Typography>
            <Typography>-- managed by --</Typography>
            <Typography>James Scott</Typography>
          </FlexiblePaper>
          <Typography>Home kit</Typography>
          <SoccerKitDisplay
            kitSetup={{
              mainColor: "red",
              secondaryColor: "blue",
              type: SoccerShirtType.STRIPES_SIMPLE,
            }}
          />
          <Typography>Away kit</Typography>
          <SoccerKitDisplay
            kitSetup={{
              mainColor: "yellowgreen",
              secondaryColor: "black",
              type: SoccerShirtType.STRIPES_45,
            }}
          />
        </Grid>
        <Grid item flex={1} minWidth="300px">
          <Typography>Current squad</Typography>
          <AppPaper>
            <SquadView formation={"4-3-3"}></SquadView>
          </AppPaper>
        </Grid>
      </Grid>
    </>
  );
}

export default TeamInfoView;
