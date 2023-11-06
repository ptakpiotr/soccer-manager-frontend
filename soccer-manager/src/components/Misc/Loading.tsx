import { Grid, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Grid flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress size={"4rem"} />
    </Grid>
  );
}

export default Loading;
