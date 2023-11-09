import { Card, CardContent, Grid } from "@mui/material";
import MiniTableView from "../Table/MiniTableView";
import RateGame from "../RateGame";
import NextGame from "./NextGame";
import TeamViewGridItem from "./TeamViewGridItem";
import MiniPanel from "../misc/MiniPanel";

function TeamView() {
  return (
    <Grid container>
      <TeamViewGridItem>
        <MiniPanel />
      </TeamViewGridItem>
      <TeamViewGridItem url={123 ? `/match/${123}` : undefined}>
        <NextGame />
      </TeamViewGridItem>
      <TeamViewGridItem>
        <RateGame />
      </TeamViewGridItem>
      <Grid item xs={12}>
        <Card
          sx={{
            margin: "2rem",
          }}
        >
          <CardContent>
            <MiniTableView />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TeamView;
