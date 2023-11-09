import { Grid } from "@mui/material";
import MonthView from "./MonthView";
import PrevMonthButton from "./PrevMonthButton";
import NextMonthButton from "./NextMonthButton";
import AddNewEvent from "./AddNewEvent";
import QuickMonthPicker from "./QuickMonthPicker";
import { CalendarEvent, Months } from "../../Types";
import { useState } from "react";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_CALENDAR } from "../../GraphQL/Queries/calendarQueries";
import Loading from "../misc/Loading";

function CalendarView() {
  const [chosenMonth, setChosenMonth] = useState<Months>(
    new Date().getUTCMonth()
  );

  const { data, loading } = useGQLQuery<{ calendar: CalendarEvent[] }>(
    GET_CALENDAR,
    {
      variables: {
        teamId: "84b287ef-648c-424a-a172-702b42409c87",
        year: 2023,
        month: 11,
      },
    }
  );
  console.log(data);
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
        {!loading && data ? (
          <MonthView calendar={data.calendar} month={11} year={2023} />
        ) : (
          <Loading />
        )}
      </Grid>
    </Grid>
  );
}

export default CalendarView;
