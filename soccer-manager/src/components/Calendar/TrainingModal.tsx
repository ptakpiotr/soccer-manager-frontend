import {
  Button,
  Dialog,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  CalendarEvent,
  ITrainingCalendarInfo,
  TrainingType,
} from "../../Types";
import { MdEventBusy } from "react-icons/md";
import AppSelectField from "../AppSelectField";

interface IProps {
  calendarEventDetails: Partial<CalendarEvent>;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<[boolean, boolean]>>;
  setCalendarEventDetails?: React.Dispatch<
    React.SetStateAction<Partial<CalendarEvent>>
  >;
  availableTrainingEntities?: Record<TrainingType, number>;
}

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const trainingTypes = (Object.keys(TrainingType) as Array<keyof TrainingType>)
  .map((k) => {
    const numK = Number(k);
    if (numK || numK === 0) {
      return {
        value: numK,
        desc: TrainingType[numK],
      };
    }
  })
  .filter((k) => k) as {
  value: number;
  desc: string;
}[];

function TrainingModal({
  isOpen,
  setOpen,
  calendarEventDetails,
  setCalendarEventDetails,
  availableTrainingEntities,
}: IProps) {
  const [trainingCalendarInfo, setTrainingCalendarInfo] =
    useState<ITrainingCalendarInfo>(
      calendarEventDetails.eventDetails as ITrainingCalendarInfo
    );

  const handleTrainingTypeChange = (e: SelectChangeEvent<number>) => {
    setTrainingCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.trainingType = e.target.value as TrainingType;
      return newEventDetails;
    });
  };

  const handleAddSecondStep = () => {
    if (setCalendarEventDetails) {
      setCalendarEventDetails((prev) => {
        let newEventDetails = {
          ...prev,
        };

        newEventDetails.eventDetails = trainingCalendarInfo;

        return newEventDetails;
      });
    }

    setOpen([false, false]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setOpen((prev) => [prev[0], false]);
      }}
    >
      <Grid container padding={"3rem"} flexDirection={"column"} rowGap={"1rem"}>
        <AppSelectField
          elementName="training-type"
          label="Training type"
          value={trainingCalendarInfo?.trainingType ?? TrainingType.DEFAULT}
          elements={trainingTypes}
          handleChange={handleTrainingTypeChange}
          isNotEditable={calendarEventDetails.notEditable}
          notEditableValue={TrainingType[trainingCalendarInfo?.trainingType]}
        />
        <FormControl>
          {availableTrainingEntities && (
            <Typography>
              Available entities:{" "}
              {
                availableTrainingEntities[
                  trainingCalendarInfo?.trainingType ?? TrainingType.DEFAULT
                ]
              }
            </Typography>
          )}
        </FormControl>
        {!calendarEventDetails.notEditable ? (
          <Button
            endIcon={<MdEventBusy />}
            variant="contained"
            onClick={handleAddSecondStep}
          >
            Add
          </Button>
        ) : (
          <></>
        )}
      </Grid>
    </Dialog>
  );
}

export default TrainingModal;
