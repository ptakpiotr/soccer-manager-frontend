import { Button, Grid, List } from "@mui/material";
import { useState } from "react";
import AcademyViewPlayer from "./AcademyViewPlayer";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { IGeneralPayload, IPlayerSquadInfo } from "../../Types";
import {
  GET_ACADEMY_PLAYERS,
  MANAGE_ACADEMY_PLAYERS,
} from "../../GraphQL/Queries/academyQueries";
import { useMutation as useGQLMutation } from "@apollo/client";
import { useErrorMessageManager } from "../../hooks/useErrorMessageManager";

interface IProps {
  players: IPlayerSquadInfo[];
}

function AcademyView({ players }: IProps) {
  const [academyPromoteList, setAcademyPromoteList] = useState<string[]>(
    players.filter((p) => p.isInAcademy === true).map((p) => p.playerId)
  );
  const [academyDemoteList, setAcademyDemoteList] = useState<string[]>(
    players.filter((p) => !p.isInAcademy).map((p) => p.playerId)
  );

  const notify = useErrorMessageManager();

  const [mutate, { data, error }] = useGQLMutation<{
    managePlayerAcademy: IGeneralPayload;
  }>(MANAGE_ACADEMY_PLAYERS, {
    refetchQueries: [GET_ACADEMY_PLAYERS],
  });

  const updateAcademyPromoteList = (playerId: string) => {
    if (academyPromoteList.includes(playerId)) {
      setAcademyPromoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    } else {
      setAcademyPromoteList((prev) => [...prev, playerId]);
    }
  };

  const updateAcademyDemoteList = (playerId: string) => {
    if (academyDemoteList.includes(playerId)) {
      setAcademyDemoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    } else {
      setAcademyDemoteList((prev) => [...prev, playerId]);
    }
  };

  const handlePromoteClick = async () => {
    await mutate({
      variables: {
        ids: academyPromoteList,
        isInAcademy: false,
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
        isInAcademy: true,
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
          {players
            .filter((p) => !p.isInAcademy)
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
