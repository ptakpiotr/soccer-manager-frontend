import { useContext } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import MiniTableView from "../Table/MiniTableView";
import RateGame from "../RateGame";
import NextGame from "./NextGame";
import TeamViewGridItem from "./TeamViewGridItem";
import MiniPanel from "../misc/MiniPanel";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_LATEST_MATCH } from "../../GraphQL/Queries/matchQueries";
import Loading from "../misc/Loading";
import NotFound from "../../pages/NotFound";
import { UserTokenContext } from "../../context";

function TeamView() {
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{
    latestMatch: { matchId: string };
  }>(GET_LATEST_MATCH, {
    variables: {
      teamId,
    },
  });

  return (
    <Grid container>
      <TeamViewGridItem>
        <MiniPanel />
      </TeamViewGridItem>
      <TeamViewGridItem
        url={
          !loading && data?.latestMatch?.matchId
            ? `/match/${data.latestMatch?.matchId}`
            : undefined
        }
      >
        {loading ? (
          <Loading />
        ) : data ? (
          <NextGame matchId={data?.latestMatch?.matchId} />
        ) : (
          <NotFound />
        )}
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
