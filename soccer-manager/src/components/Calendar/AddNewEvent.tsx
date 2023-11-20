import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation as useGQLMutation } from "@apollo/client";
import EventModal from "./EventModal";
import { CalendarEvent, EventType, IGeneralPayload } from "../../Types";
import MatchModal from "./MatchModal";
import TrainingModal from "./TrainingModal";
import { useMessageManager } from "../../hooks/useMessageManager";
import { ADD_EVENT } from "../../GraphQL/Mutations/calendarMutation";
import { eventSchema } from "../../Validation";
import { UserTokenContext } from "../../context";
import { GET_CALENDAR } from "../../GraphQL/Queries/calendarQueries";
import Globals from "../../Globals";

function AddNewEvent() {
  const { teamId } = useContext(UserTokenContext);

  const [isModalOpen, setModalOpen] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const [calendarEvent, setCalendarEvent] = useState<Partial<CalendarEvent>>(
    {}
  );

  const [mutate] = useGQLMutation<{ addCalendarEvent: IGeneralPayload }>(
    ADD_EVENT,
    {
      refetchQueries: [GET_CALENDAR],
    }
  );

  const notify = useMessageManager();

  const addEvent = async () => {
    try {
      const eventData = await eventSchema.validate(calendarEvent);

      const { data, errors } = await mutate({
        variables: {
          input: {
            day: eventData.day,
            description: eventData.description,
            eventType: eventData.eventType,
            ground: eventData.match?.ground,
            month: eventData.month,
            rivalTeamId: eventData.match?.awayTeamId,
            teamId,
            trainingType: Globals.functions.mapTrainingTypeToNumericalValue(
              eventData.training?.trainingType
            ),
            year: eventData.year,
          },
        },
      });

      if (errors) {
        notify(errors.join(","));
      } else if (data) {
        if (data.addCalendarEvent.errorMessage) {
          notify(data.addCalendarEvent.errorMessage);
        }
        notify("Succesfully added an event", "success");
      }
    } catch (ex) {
      notify("Invalid event data");
    }
  };

  const renderEventTypeModal = () => {
    if (isModalOpen[1]) {
      switch (calendarEvent.eventType) {
        case EventType.MATCH:
          return (
            <MatchModal
              isOpen={isModalOpen[1]}
              setOpen={setModalOpen}
              addEvent={addEvent}
              calendarEventDetails={calendarEvent}
              setCalendarEventDetails={setCalendarEvent}
            />
          );
        case EventType.TRAINING:
          return (
            <TrainingModal
              isOpen={isModalOpen[1]}
              setOpen={setModalOpen}
              addEvent={addEvent}
              isEdit={false}
              calendarEventDetails={calendarEvent}
              setCalendarEventDetails={setCalendarEvent}
            />
          );
        default:
          return <></>;
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <EventModal
        isOpen={isModalOpen[0]}
        setOpen={setModalOpen}
        calendarEventDetails={calendarEvent}
        setCalendarEventDetails={setCalendarEvent}
      />
      {renderEventTypeModal()}
      <Button
        onClick={() => {
          setModalOpen((prev) => [!prev[0], prev[1]]);
        }}
        color="error"
      >
        <MdAdd />
      </Button>
    </>
  );
}

export default AddNewEvent;
