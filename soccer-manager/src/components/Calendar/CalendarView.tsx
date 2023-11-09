import { Grid } from "@mui/material";
import MonthView from "./MonthView";
import PrevMonthButton from "./PrevMonthButton";
import NextMonthButton from "./NextMonthButton";
import AddNewEvent from "./AddNewEvent";
import QuickMonthPicker from "./QuickMonthPicker";
import { CalendarEvent, Months } from "../../Types";
import { useContext, useState } from "react";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_CALENDAR } from "../../GraphQL/Queries/calendarQueries";
import Loading from "../misc/Loading";
import { UserTokenContext } from "../../context";

function CalendarView() {
  const [chosenMonth, setChosenMonth] = useState<Months>(
    new Date().getUTCMonth()
  );

  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{ calendar: CalendarEvent[] }>(
    GET_CALENDAR,
    {
      variables: {
        teamId,
        year: 2023,
        month: 11,
      },
    }
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
