import { Button } from "@mui/material";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import EventModal from "./EventModal";
import { CalendarEvent, EventType } from "../../Types";
import MatchModal from "./MatchModal";
import TrainingModal from "./TrainingModal";

function AddNewEvent() {
  const [isModalOpen, setModalOpen] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const [calendarEvent, setCalendarEvent] = useState<Partial<CalendarEvent>>(
    {}
  );

  const renderEventTypeModal = () => {
    if (isModalOpen[1]) {
      switch (calendarEvent.eventType) {
        case EventType.MATCH:
          return (
            <MatchModal
              isOpen={isModalOpen[1]}
              setOpen={setModalOpen}
              calendarEventDetails={calendarEvent}
              setCalendarEventDetails={setCalendarEvent}
            />
          );
        case EventType.TRAINING:
          return (
            <TrainingModal
              isOpen={isModalOpen[1]}
              setOpen={setModalOpen}
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
