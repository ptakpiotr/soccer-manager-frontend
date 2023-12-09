import { Button, Grid, List, Typography } from "@mui/material";
import { useState } from "react";
import AcademyViewPlayer from "./AcademyViewPlayer";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { IGeneralPayload, IPlayerSquadInfo } from "../../Types";
import {
  GET_ACADEMY_PLAYERS,
  MANAGE_ACADEMY_PLAYERS,
} from "../../GraphQL/Queries/academyQueries";
import { useMutation as useGQLMutation } from "@apollo/client";
import { useMessageManager } from "../../hooks/useMessageManager";
import { GET_TACTICS_PLAYERS } from "../../GraphQL/Queries/playerQueries";

interface IProps {
  players: IPlayerSquadInfo[];
}

function AcademyView({ players }: IProps) {
  const [academyPromoteList, setAcademyPromoteList] = useState<string[]>([]);
  const [academyDemoteList, setAcademyDemoteList] = useState<string[]>([]);

  const notify = useMessageManager();

  const [mutate, { data, error }] = useGQLMutation<{
    managePlayerAcademy: IGeneralPayload;
  }>(MANAGE_ACADEMY_PLAYERS, {
    refetchQueries: [GET_ACADEMY_PLAYERS, GET_TACTICS_PLAYERS],
  });

  const updateAcademyPromoteList = (playerId: string) => {
    if (!academyPromoteList.includes(playerId)) {
      setAcademyPromoteList((prev) => [...prev, playerId]);
    } else {
      setAcademyPromoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    }
  };

  const updateAcademyDemoteList = (playerId: string) => {
    if (!academyDemoteList.includes(playerId)) {
      setAcademyDemoteList((prev) => [...prev, playerId]);
    } else {
      setAcademyDemoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    }
  };

  const handlePromoteClick = async () => {
    await mutate({
      variables: {
        ids: academyPromoteList,
        isInAcademy: true,
      },
    });

    if (data?.managePlayerAcademy.errorMessage) {
      notify(data?.managePlayerAcademy.errorMessage);
    } else if (error) {
      notify(error.message);
    } else {
      notify("Succesfully promoted", "success");
    }
  };

  const handleDemoteClick = async () => {
    await mutate({
      variables: {
        ids: academyDemoteList,
        isInAcademy: false,
      },
    });

    if (data?.managePlayerAcademy.errorMessage) {
      notify(data?.managePlayerAcademy.errorMessage);
    } else if (error) {
      notify(error.message);
    } else {
      notify("Succesfully demoted", "success");
    }
  };

  return (
    <Grid container>
      <Grid flex={6} item>
        <List
          sx={{
            overflow: "auto",
            height: "70vh",
          }}
        >
          <Typography variant="h6">Players in academy</Typography>
          {players
            .filter((p) => p.isInAcademy === true)
            .map((p) => (
              <AcademyViewPlayer
                playerInfo={p}
                key={p.playerId}
                updateList={updateAcademyPromoteList}
              />
            ))}
        </List>
        <Button
          variant="contained"
          color="info"
          endIcon={<MdArrowUpward />}
          onClick={handlePromoteClick}
        >
          Promote
        </Button>
      </Grid>
      <Grid flex={6} item>
        <List
          sx={{
            overflow: "auto",
            height: "70vh",
          }}
        >
          <Typography variant="h6">Players in the squad</Typography>
          {players
            .filter((p) => !p.isInAcademy && !p.squadPosition)
            .map((p) => (
              <AcademyViewPlayer
                playerInfo={p}
                key={p.playerId}
                updateList={updateAcademyDemoteList}
              />
            ))}
        </List>
        <Button
          variant="contained"
          color="error"
          endIcon={<MdArrowDownward />}
          onClick={handleDemoteClick}
        >
          Demote
        </Button>
      </Grid>
    </Grid>
  );
}

export default AcademyView;
