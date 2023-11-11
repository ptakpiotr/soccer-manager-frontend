import { Grid, Typography } from "@mui/material";
import MonthView from "./MonthView";
import PrevMonthButton from "./PrevMonthButton";
import NextMonthButton from "./NextMonthButton";
import AddNewEvent from "./AddNewEvent";
import QuickMonthPicker from "./QuickMonthPicker";
import { CalendarEvent, ITableTeamInfo, Months } from "../../Types";
import { useContext, useEffect, useState } from "react";
import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_CALENDAR } from "../../GraphQL/Queries/calendarQueries";
import Loading from "../misc/Loading";
import { UserTokenContext } from "../../context";
import { useMessageManager } from "../../hooks/useMessageManager";

function CalendarView() {
  const [chosenMonth, setChosenMonth] = useState<Months>(
    new Date().getUTCMonth()
  );
  const [chosenYear, setChosenYear] = useState<number>(
    new Date().getUTCFullYear()
  );

  const { teamId } = useContext(UserTokenContext);

  const { data, loading, error } = useGQLQuery<{ calendar: CalendarEvent[] }>(
    GET_CALENDAR,
    {
      variables: {
        teamId,
        year: chosenYear,
        month: chosenMonth,
      },
    }
  );

  const notify = useMessageManager();

  useEffect(() => {
    if (error) {
      notify("An error has occured while fetching for calendar");
    }
  }, [error]);

  const setNewYear = (oldMonth: Months, newMonth: Months) => {
    if (oldMonth === Months.DECEMBER && newMonth === Months.JANUARY) {
      setChosenYear((prev) => prev + 1);
    } else if (oldMonth === Months.JANUARY && newMonth === Months.DECEMBER) {
      setChosenYear((prev) => prev - 1);
    }
  };

  return (
    <Grid container flexDirection="column">
      <Grid container flexDirection="row">
        <Grid flex={1} container flexDirection="row">
          <PrevMonthButton
            month={chosenMonth}
            setMonth={setChosenMonth}
            setNewYear={setNewYear}
          />
          <NextMonthButton
            month={chosenMonth}
            setMonth={setChosenMonth}
            setNewYear={setNewYear}
          />
          <QuickMonthPicker month={chosenMonth} setMonth={setChosenMonth} />
          <Typography marginLeft={"0.5rem"} fontWeight={"bold"}>
            {chosenYear}
          </Typography>
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
