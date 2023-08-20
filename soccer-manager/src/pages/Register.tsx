import RegisterView from "../components/Account/RegisterView";
import SoccerKitDesinger from "../components/misc/SoccerKitDesinger";
import SoccerLogoDesigner from "../components/misc/SoccerLogoDesigner";
import { Grid, Typography } from "@mui/material";

function Register() {
  return (
    <main>
      <Grid container flexDirection={"row"}>
        <Grid container columnGap="3rem">
          <Grid flex={1}item>
            <RegisterView />
          </Grid>
          <Grid item>
            <SoccerLogoDesigner />
          </Grid>
        </Grid>
        <Grid container flex={1} columnGap="3rem">
          <Grid item>
            <SoccerKitDesinger />
          </Grid>
          <Grid item>
            <SoccerKitDesinger />
          </Grid>
        </Grid>
        
      </Grid>
    </main>
  );
}

export default Register;
