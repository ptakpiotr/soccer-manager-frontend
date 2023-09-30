import { Card, Grid, ButtonBase, CardContent } from "@mui/material";
import { useMemo } from "react";
import {
  CalendarEvent,
  EventType,
  GroundType,
  IMatchCalendarInfo,
  MatchType,
} from "../../Types";
import MatchEventView from "./MatchEventView";

interface IProps {
  day: number;
}

function DayView({ day }: IProps) {
  const isOutdated = useMemo(() => {
    const today = new Date();

    if (day < today.getUTCDay()) {
      return true;
    }
  }, [day]);

  const calendarEventDetails: CalendarEvent = {
    id: "123",
    day,
    eventDetails: {
      ground: GroundType.HOME,
      type: MatchType.FRIENDLY,
      rivalTeamId: 1,
      awayScore: 2,
      homeScore: 3,
    } as IMatchCalendarInfo,
    eventType: EventType.MATCH,
    month: 8,
    year: 2023,
    description: "test",
    notEditable: isOutdated,
  };

  return (
    <Grid item>
      <ButtonBase>
        <Card
          sx={{
            width: "200px",
            height: "200px",
            borderColor: isOutdated ? "darkslategray" : "",
          }}
          variant="outlined"
        >
          <CardContent>
            <MatchEventView eventData={calendarEventDetails} />
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}

export default DayView;
