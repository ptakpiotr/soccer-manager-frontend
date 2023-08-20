import {
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import MiniTableView from "../Table/MiniTableView";
import FinancePerformance from "./FinancePerformance";
import RateGame from "../RateGame";
import NextGame from "./NextGame";
import MiniPanel from "../Misc/MiniPanel";
import TeamViewGridItem from "./TeamViewGridItem";

function TeamView() {
  return (
    <Grid container>
      <TeamViewGridItem>
        <MiniPanel />
      </TeamViewGridItem>
      <TeamViewGridItem>
        <NextGame />
      </TeamViewGridItem>
      <TeamViewGridItem>
        <RateGame />
      </TeamViewGridItem>
      <TeamViewGridItem>
        <FinancePerformance
          monthlyPerformance={[
            { month: 1, money: 20 },
            { month: 2, money: 50 },
            { month: 3, money: 0 },
            { month: 4, money: 10_0 },
          ]}
        />
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
