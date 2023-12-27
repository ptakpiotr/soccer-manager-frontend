import { BiSolidTrafficCone } from "react-icons/bi";
import { CalendarEvent } from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";
import { useState } from "react";
import TrainingModal from "./TrainingModal";
import NoData from "../misc/NoData";

interface IProps {
  eventData: CalendarEvent;
  editEvent: () => Promise<void>;
}

function TrainingEventView({ eventData, editEvent }: IProps) {
  const { training, day } = eventData;

  const [isModalOpen, setModalOpen] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  const handleEventInfoClick = () => {
    setModalOpen([false, true]);
  };

  return training ? (
    <>
      <Grid container flexDirection={"row"} onClick={handleEventInfoClick}>
        <Grid container>
          <Grid item flex={1} className="calendar-day">
            {day}
          </Grid>
          <Grid item>
            <BiSolidTrafficCone
              color={Globals.functions.mapTrainingTypeToColor(
                training.trainingType
              )}
              size={"3rem"}
            />
          </Grid>
        </Grid>
        <Grid container>{training.trainingType}</Grid>
      </Grid>
      <TrainingModal
        isOpen={isModalOpen[1]}
        setOpen={setModalOpen}
        addEvent={editEvent}
        isEdit={true}
        calendarEventDetails={eventData}
      />
    </>
  ) : (
    <NoData />
  );
}

export default TrainingEventView;
