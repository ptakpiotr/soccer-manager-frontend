import { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useMutation as useGQLMutation } from "@apollo/client";
import AppPaper from "../components/AppPaper";
import AppSelect from "../components/AppSelect";
import SquadView from "../components/SquadView";
import TacticsPlayerList from "../components/TacticsPlayerList";
import { MdSave } from "react-icons/md";
import { TacticsContext, UserTokenContext } from "../context";
import NoData from "../components/misc/NoData";
import { MODIFY_TEAM_TACTICS } from "../GraphQL/Mutations/playerMutations";
import { GET_TACTICS_PLAYERS } from "../GraphQL/Queries/playerQueries";
import { IGeneralPayload } from "../Types";
import { useMessageManager } from "../hooks/useMessageManager";

function Tactics() {
  const {
    squad,
    reserve,
    formation: tactics,
    setFormation: setTactics,
  } = useContext(TacticsContext);
  const { teamId } = useContext(UserTokenContext);

  const [mutate] = useGQLMutation<{ modifyTeamTactics: IGeneralPayload }>(
    MODIFY_TEAM_TACTICS,
    {
      refetchQueries: [GET_TACTICS_PLAYERS],
    }
  );

  const notify = useMessageManager();

  const handleSave = async () => {
    const benchPlayers = reserve?.map((r) => r.playerId);
    const squadPlayers = squad?.map((s) => ({
      id: s.playerId,
      squadPosition: s.squadPosition,
    }));

    const { data, errors } = await mutate({
      variables: {
        teamId,
        benchPlayers,
        squadPlayers,
        formation: tactics,
      },
    });

    if (errors) {
      notify("An error has occured", "error");
    } else if (data?.modifyTeamTactics.errorMessage) {
      notify(data?.modifyTeamTactics.errorMessage, "error");
    } else {
      notify("Successfully saved squad", "success");
    }
  };

  return (
    <main>
      <Grid container>
        <Grid item flex={3}>
          <AppPaper>
            <AppSelect
              elementName="Formation"
              elements={[
                {
                  value: "4-3-3",
                },
                {
                  value: "3-5-2",
                },
              ]}
              handleChange={(e) => {
                if (setTactics) {
                  setTactics(e.target.value as string);
                }
              }}
              label="Formation"
              value={tactics ?? "4-3-3"}
            />
            <Button
              variant="contained"
              fullWidth={true}
              startIcon={<MdSave />}
              sx={{
                marginTop: "0.25rem",
                marginBottom: "0.25rem",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <TacticsPlayerList />
          </AppPaper>
        </Grid>
        <Grid item flex={9} minWidth="300px">
          <AppPaper>
            {squad ? (
              <SquadView
                squad={squad}
                formation={tactics ?? "4-3-3"}
              ></SquadView>
            ) : (
              <NoData />
            )}
          </AppPaper>
        </Grid>
      </Grid>
    </main>
  );
}

export default Tactics;
