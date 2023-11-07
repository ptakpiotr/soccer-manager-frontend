import AppPaper from "../AppPaper";
import { Grid, Typography } from "@mui/material";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";
import { ITeamInfoData, ITeamInfoView } from "../../Types";
import SquadView from "../SquadView";
import { useNavigate } from "react-router-dom";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_TEAMVIEW } from "../../GraphQL/Queries/miscQueries";
import { useEffect, useState } from "react";
import Loading from "../misc/Loading";
interface IProps {
  teamId: string;
}

function MatchCentrePaper({ teamId }: IProps) {
  const [teamData, setTeamData] = useState<ITeamInfoData>();

  const { data, loading } = useGQLQuery<ITeamInfoView>(GET_TEAMVIEW, {
    variables: {
      teamId,
    },
    pollInterval: 360000,
  });

  useEffect(() => {
    if (!loading && data) {
      setTeamData(data.teams.nodes[0]);
    }
  }, [data, loading]);

  const navigate = useNavigate();

  const handleClick = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

  return !loading && teamData ? (
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
            mainColor: teamData.logo.mainColor,
            secondaryColor: teamData.logo.secondaryColor,
            type: teamData.logo.type,
            name: teamData.name,
            iconId: "gi-chicken",
          }}
          additionalClasses={["player-soccer-team-logo"]}
        />
        <Typography component="span" variant="h6">
          {teamData.name}
        </Typography>
      </Grid>
      <SquadView
        formation={teamData.formation ?? "4-3-3"}
        squad={teamData.players.filter(
          (p) => !p.isInAcademy && p.squadPosition && !p.isBenched
        )}
      ></SquadView>
    </AppPaper>
  ) : (
    <Loading />
  );
}

export default MatchCentrePaper;
