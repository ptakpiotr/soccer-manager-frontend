import { Grid } from "@mui/material";
import MonthView from "./MonthView";
import PrevMonthButton from "./PrevMonthButton";
import NextMonthButton from "./NextMonthButton";
import AddNewEvent from "./AddNewEvent";
import QuickMonthPicker from "./QuickMonthPicker";
import { Months } from "../../Types";
import { useState } from "react";

function CalendarView() {
  const [chosenMonth, setChosenMonth] = useState<Months>(
    new Date().getUTCMonth()
  );

  return (
    <Grid container flexDirection="column">
      <Grid container flexDirection="row">
        <Grid flex={1} container flexDirection="row">
          <PrevMonthButton month={chosenMonth} setMonth={setChosenMonth} />
          <NextMonthButton month={chosenMonth} setMonth={setChosenMonth} />
          <QuickMonthPicker month={chosenMonth} setMonth={setChosenMonth} />
        </Grid>
        <AddNewEvent />
      </Grid>
      <Grid item>
        <MonthView />
      </Grid>
    </Grid>
  );
}

export default CalendarView;
