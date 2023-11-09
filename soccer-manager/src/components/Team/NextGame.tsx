import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { GET_MATCH_EXPANDED } from "../../GraphQL/Queries/matchQueries";
import { useQuery as useGQLQuery } from "@apollo/client";
import { IMatchExpanded } from "../../Types";
import Loading from "../misc/Loading";
import NotFound from "../../pages/NotFound";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";

interface IProps {
  matchId: string;
}

function NextGame({ matchId }: IProps) {
  const { data, loading } = useGQLQuery<{
    matches: IMatchExpanded[];
  }>(GET_MATCH_EXPANDED, {
    variables: {
      matchId,
    },
  });

  return loading ? (
    <Loading />
  ) : data ? (
    <Grid container>
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardMedia>
                <SoccerLogoDisplay
                  logoSetup={{
                    mainColor: data.matches[0].homeTeam.logo.mainColor,
                    secondaryColor:
                      data.matches[0].homeTeam.logo.secondaryColor,
                    type: data.matches[0].homeTeam.logo.type,
                    name: data.matches[0].homeTeam.logo.name,
                    iconId: data.matches[0].homeTeam.logo.iconId,
                  }}
                  additionalClasses={["player-soccer-team-logo-2"]}
                />
              </CardMedia>
              <Typography>{data.matches[0].homeTeam.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardMedia>
                <SoccerLogoDisplay
                  logoSetup={{
                    mainColor: data.matches[0].awayTeam.logo.mainColor,
                    secondaryColor:
                      data.matches[0].awayTeam.logo.secondaryColor,
                    type: data.matches[0].awayTeam.logo.type,
                    name: data.matches[0].awayTeam.logo.name,
                    iconId: data.matches[0].awayTeam.logo.iconId,
                  }}
                  additionalClasses={["player-soccer-team-logo-2"]}
                />
              </CardMedia>
              <Typography>{data.matches[0].awayTeam.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <NotFound />
  );
}

export default NextGame;
