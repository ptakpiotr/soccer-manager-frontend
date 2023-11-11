import { Card, Grid, ButtonBase, CardContent } from "@mui/material";
import { useMemo } from "react";
import { CalendarEvent, EventType } from "../../Types";
import MatchEventView from "./MatchEventView";
import NoCalendarData from "../misc/NoCalendarData";
import TrainingEventView from "./TrainingEventView";

interface IProps {
  day: number;
  event?: CalendarEvent;
}

function DayView({ day, event }: IProps) {
  const isOutdated = useMemo(() => {
    const today = new Date();

    if (event && event.day <= today.getUTCDay()) {
      return true;
    }

    return event?.notEditable;
  }, [event?.day]);

  //TODO: repair editing of events
  const editEvent = async () => {};

  return (
    <Grid item>
      <ButtonBase disabled={!event}>
        <Card
          sx={{
            width: "200px",
            height: "200px",
            borderColor: isOutdated ? "darkslategray" : "",
          }}
          variant="outlined"
        >
          <CardContent>
            {event ? (
              event.eventType === EventType.MATCH ? (
                <MatchEventView eventData={event} editEvent={editEvent} />
              ) : (
                <TrainingEventView eventData={event} editEvent={editEvent} />
              )
            ) : (
              <NoCalendarData day={day} />
            )}
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}

export default DayView;
