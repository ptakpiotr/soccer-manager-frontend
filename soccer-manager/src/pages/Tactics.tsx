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

function Tactics() {
  const [tactics, setTactics] = useState<string>("4-3-3");
  const { squad, reserve } = useContext(TacticsContext);
  const { teamId } = useContext(UserTokenContext);

  const [mutate, _] = useGQLMutation(MODIFY_TEAM_TACTICS, {
    refetchQueries: [GET_TACTICS_PLAYERS],
  });

  const handleSave = async () => {
    const benchPlayers = reserve?.map((r) => r.playerId);
    const squadPlayers = squad?.map((s) => ({
      id: s.playerId,
      squadPosition: s.squadPosition,
    }));

    await mutate({
      variables: {
        teamId,
        benchPlayers,
        squadPlayers,
      },
    });
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
                setTactics(e.target.value as string);
              }}
              label="Formation"
              value={tactics}
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
              <SquadView squad={squad} formation={tactics}></SquadView>
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
