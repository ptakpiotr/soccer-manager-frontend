import { BiSolidTrafficCone } from "react-icons/bi";
import {
  CalendarEvent,
  ITrainingCalendarInfo,
  TrainingType,
} from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";
import { useState } from "react";
import TrainingModal from "./TrainingModal";

interface IProps {
  eventData: CalendarEvent;
}

function TrainingEventView({ eventData }: IProps) {
  const { eventDetails, day } = eventData;

  const [isModalOpen, setModalOpen] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const handleEventInfoClick = () => {
    setModalOpen([false, true]);
  };

  return (
    <>
      <Grid container flexDirection={"row"} onClick={handleEventInfoClick}>
        <Grid container>
          <Grid item flex={1}>
            {TrainingType[(eventDetails as ITrainingCalendarInfo).trainingType]}
          </Grid>
          <Grid item>
            <BiSolidTrafficCone
              color={Globals.functions.mapTrainingTypeToColor(
                (eventDetails as ITrainingCalendarInfo).trainingType
              )}
              size={"3rem"}
            />
          </Grid>
        </Grid>
        <Grid container>{day}</Grid>
      </Grid>
      <TrainingModal
        isOpen={isModalOpen[1]}
        setOpen={setModalOpen}
        calendarEventDetails={eventData}
      />
    </>
  );
}

export default TrainingEventView;
