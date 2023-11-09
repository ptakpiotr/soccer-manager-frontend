import { Card, Grid, ButtonBase, CardContent } from "@mui/material";
import { useMemo } from "react";
import { CalendarEvent } from "../../Types";
import MatchEventView from "./MatchEventView";

interface IProps {
  event?: CalendarEvent;
}
//TODO: match simulation & calendar future events
function DayView({ event }: IProps) {
  const isOutdated = useMemo(() => {
    const today = new Date();

    if (event && event.day <= today.getUTCDay()) {
      return true;
    }

    return event?.notEditable;
  }, [event?.day]);

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
            {event ? <MatchEventView eventData={event} /> : <>NO DATA</>}
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}

export default DayView;
