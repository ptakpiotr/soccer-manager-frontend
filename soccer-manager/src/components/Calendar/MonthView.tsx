import Enumerable from "linq";
import React from "react";
import DayView from "./DayView";
import { Grid } from "@mui/material";

interface IProps {
  year: number;
  month: number;
}

function MonthView() {
  return (
    <Grid
      container
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {Enumerable.range(1, 31)
        .toArray()
        .map((d) => (
          <DayView key={d} day={d} />
        ))}
    </Grid>
  );
}

export default MonthView;
