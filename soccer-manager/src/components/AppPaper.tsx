import { PropsWithChildren } from "react";
import { Paper, PaperProps } from "@mui/material";

function AppPaper(props: PropsWithChildren<PaperProps>) {
  return (
    <Paper
      className="app-paper"
      {...props}
      elevation={5}
      variant="elevation"
      sx={{
        minHeight: "80dvh",
        margin: "0.5rem",
      }}
    >
      {props.children}
    </Paper>
  );
}

export default AppPaper;
