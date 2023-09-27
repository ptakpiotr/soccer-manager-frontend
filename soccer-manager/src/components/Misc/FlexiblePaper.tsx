import { Grid, Paper, PaperProps } from "@mui/material";
import { PropsWithChildren } from "react";

function FlexiblePaper(props: PropsWithChildren<PaperProps>) {
  return (
    <Paper {...props} elevation={1}>
      <Grid
        container
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {props.children}
      </Grid>
    </Paper>
  );
}

export default FlexiblePaper;
