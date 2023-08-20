import {
  Dialog,
  FormControl,
  Grid,
  FilledInput,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { CalendarEvent, EventType } from "../../Types";
import AppSelect from "../AppSelect";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

function EventModal({ isOpen, setOpen }: IProps) {
  const [__, _] = useState<CalendarEvent>();
  const [eventType, setEventType] = useState<EventType>(EventType.TRAINING);

  const handleEventTypeChange = (e: SelectChangeEvent<number>) => {
    setEventType(e.target.value as number as EventType);
  };

  console.log(events);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen(false);
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
            <FilledInput type="text" id="event-desc" />
          </FormControl>
          <FormControl>
            <FilledInput type="date" id="event-desc" />
          </FormControl>
          <FormControl>
            <AppSelect
              elementName="event-type"
              label="Event type"
              value={eventType}
              elements={events}
              handleChange={handleEventTypeChange}
            />
          </FormControl>
        </Grid>
      </Dialog>
    </>
  );
}

export default EventModal;
