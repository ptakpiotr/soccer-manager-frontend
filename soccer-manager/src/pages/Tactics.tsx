import { useState } from "react";
import { Button, Grid } from "@mui/material";
import AppPaper from "../components/AppPaper";
import AppSelect from "../components/AppSelect";
import SquadView from "../components/SquadView";
import TacticsPlayerList from "../components/TacticsPlayerList";
import { MdSave } from "react-icons/md";

function Tactics() {
  const [tactics, setTactics] = useState<string>("4-3-3");

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
            >
              Save
            </Button>
            <TacticsPlayerList />
          </AppPaper>
        </Grid>
        <Grid item flex={9} minWidth="300px">
          <AppPaper>
            <SquadView formation={tactics}></SquadView>
          </AppPaper>
        </Grid>
      </Grid>
    </main>
  );
}

export default Tactics;
