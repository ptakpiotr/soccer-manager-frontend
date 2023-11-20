import { Card, Grid, ButtonBase, CardContent } from "@mui/material";
import { useMemo } from "react";
import { useMutation as useGQLMutation } from "@apollo/client";
import { CalendarEvent, EventType, IGeneralPayload } from "../../Types";
import MatchEventView from "./MatchEventView";
import NoCalendarData from "../misc/NoCalendarData";
import TrainingEventView from "./TrainingEventView";
import { EDIT_EVENT } from "../../GraphQL/Mutations/calendarMutation";
import { GET_CALENDAR } from "../../GraphQL/Queries/calendarQueries";
import { useMessageManager } from "../../hooks/useMessageManager";
import { editEventSchema } from "../../Validation";
import Globals from "../../Globals";

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

  const notify = useMessageManager();

  const [mutate] = useGQLMutation<{ editCalendarEvent: IGeneralPayload }>(
    EDIT_EVENT,
    {
      refetchQueries: [GET_CALENDAR],
    }
  );

  const editEvent = async () => {
    try {
      const eventData = await editEventSchema.validate(event);

      const { data, errors } = await mutate({
        variables: {
          id: event?.id!,
          input: {
            description: eventData.description,
            eventType: eventData.eventType,
            ground: eventData.match?.ground,
            rivalTeamId: eventData.match?.awayTeamId,
            trainingType: Globals.functions.mapTrainingTypeToNumericalValue(
              eventData.training?.trainingType
            ),
          },
        },
      });

      if (errors) {
        notify(errors.join(","));
      } else if (data) {
        if (data.editCalendarEvent.errorMessage) {
          notify(data.editCalendarEvent.errorMessage);
        }
        notify("Succesfully edited an event", "success");
      }
    } catch (ex) {
      notify("Invalid event data");
    }
  };

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
