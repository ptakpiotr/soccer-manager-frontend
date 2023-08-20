import { Grid } from "@mui/material";
import MonthView from "./MonthView";
import PrevMonthButton from "./PrevMonthButton";
import NextMonthButton from "./NextMonthButton";
import AddNewEvent from "./AddNewEvent";

function CalendarView() {
  return (
    <Grid container flexDirection="column">
      <Grid container flexDirection={"row"}>
        <PrevMonthButton />
        <NextMonthButton />
        <AddNewEvent />
      </Grid>
      <Grid item>
        <MonthView />
      </Grid>
    </Grid>
  );
}

export default CalendarView;
