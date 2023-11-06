import { Card, CardContent, Grid } from "@mui/material";
import MiniTableView from "../Table/MiniTableView";
import FinancePerformance from "./FinancePerformance";
import RateGame from "../RateGame";
import NextGame from "./NextGame";
import TeamViewGridItem from "./TeamViewGridItem";
import MiniPanel from "../misc/MiniPanel";
import ErrorView from "../misc/ErrorView";
import { useErrorMessageManager } from "../../hooks/useErrorMessageManager";
import { useEffect } from "react";

function TeamView() {
  const nextGameId = 123;

  const { setErrorMessage } = useErrorMessageManager();

  useEffect(() => {
    if (setErrorMessage) {
      if (!nextGameId) {
        setErrorMessage("No next game info");
      } else {
        setErrorMessage("");
      }
    }
  }, [nextGameId]);

  return (
    <Grid container>
      <TeamViewGridItem>
        <MiniPanel />
      </TeamViewGridItem>
      <TeamViewGridItem url={nextGameId ? `/match/${nextGameId}` : undefined}>
        {nextGameId ? <NextGame /> : <ErrorView />}
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
