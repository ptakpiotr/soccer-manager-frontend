import {
  Dialog,
  FormControl,
  Grid,
  FilledInput,
  InputLabel,
  SelectChangeEvent,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { CalendarEvent, EventType } from "../../Types";
import { MdEvent, MdClear } from "react-icons/md";
import AppSelectField from "../AppSelectField";

interface IProps {
  calendarEventDetails: Partial<CalendarEvent>;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<[boolean, boolean]>>;
  setCalendarEventDetails: React.Dispatch<
    React.SetStateAction<Partial<CalendarEvent>>
  >;
}

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const events = (Object.keys(EventType) as Array<keyof EventType>)
  .map((k) => {
    const numK = Number(k);
    if (numK || numK === 0) {
      return {
        value: numK,
        desc: EventType[numK],
      };
    }
  })
  .filter((k) => k) as {
  value: number;
  desc: string;
}[];

function EventModal({
  isOpen,
  setOpen,
  calendarEventDetails,
  setCalendarEventDetails,
}: IProps) {
  const { year, month, day } = calendarEventDetails;
  const currentDate = new Date();

  const [eventDate, setEventDate] = useState<Date>(
    new Date(
      year ?? currentDate.getFullYear(),
      month ?? currentDate.getMonth(),
      day ?? currentDate.getDay()
    )
  );
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleEventTypeChange = (e: SelectChangeEvent<number>) => {
    setCalendarEventDetails((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.eventType = e.target.value as EventType;
      return newEventDetails;
    });
  };

  const handleAddFirstStep = () => {
    let isEventValid = true;
    //TODO: validate event term!
    let isEventDateAvailable = Math.floor(Math.random() * 10) % 2 == 0;

    isEventValid = [isEventDateAvailable].some((v) => v === false);

    setIsValid(isEventValid);

    if (isEventValid) {
      setOpen([false, true]);
    }
  };

  const handleClearDateClick = () => {
    setIsValid(true);
    setEventDate(
      new Date(
        year ?? currentDate.getFullYear(),
        month ?? currentDate.getMonth(),
        day ?? currentDate.getDay()
      )
    );
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen((prev) => [false, prev[1]]);
        }}
      >
        <Grid
          container
          padding={"3rem"}
          flexDirection={"column"}
          rowGap={"1rem"}
        >
          <FormControl>
            <InputLabel htmlFor="event-desc">Description</InputLabel>
            <FilledInput
              type="text"
              id="event-desc"
              value={calendarEventDetails.description}
              disabled={calendarEventDetails.notEditable}
            />
          </FormControl>
          <FormControl>
            <FilledInput
              type="date"
              id="event-date"
              value={eventDate.toISOString().split("T")[0]}
              onChange={(e) => {
                setEventDate(new Date(e.target.value));
              }}
              disabled={calendarEventDetails.notEditable}
            />
            <FormHelperText>
              When unavailable - event not possible to add
            </FormHelperText>
            <Button
              color="secondary"
              endIcon={<MdClear />}
              onClick={handleClearDateClick}
              disabled={calendarEventDetails.notEditable}
            >
              Clear date
            </Button>
          </FormControl>
          <AppSelectField
            elementName="event-type"
            label="Event type"
            value={calendarEventDetails.eventType ?? EventType.NONE}
            elements={events}
            handleChange={handleEventTypeChange}
            isNotEditable={calendarEventDetails.notEditable}
            notEditableValue={
              EventType[calendarEventDetails.eventType ?? EventType.NONE]
            }
          />
          {!calendarEventDetails.notEditable ? (
            <Button
              endIcon={<MdEvent />}
              variant="contained"
              onClick={handleAddFirstStep}
              disabled={!isValid}
            >
              Add
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Dialog>
    </>
  );
}

export default EventModal;
