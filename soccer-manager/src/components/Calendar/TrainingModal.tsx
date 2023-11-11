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
  addEvent: () => Promise<void>;
}

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const trainingTypes = (Object.keys(TrainingType) as Array<keyof TrainingType>)
  .map((k: keyof TrainingType) => {
    return {
      value: k,
      desc: k,
    };
  })
  .filter((k) => k) as {
  value: string;
  desc: string;
}[];

function TrainingModal({
  isOpen,
  setOpen,
  calendarEventDetails,
  setCalendarEventDetails,
  addEvent,
}: IProps) {
  const [trainingCalendarInfo, setTrainingCalendarInfo] =
    useState<ITrainingCalendarInfo>(
      calendarEventDetails.training as ITrainingCalendarInfo
    );

  const handleTrainingTypeChange = (e: SelectChangeEvent<string>) => {
    setTrainingCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.trainingType = e.target.value as TrainingType;
      return newEventDetails;
    });
  };

  const handleAddSecondStep = async () => {
    if (setCalendarEventDetails) {
      setCalendarEventDetails((prev) => {
        let newEventDetails = {
          ...prev,
        };

        newEventDetails.training = trainingCalendarInfo;

        return newEventDetails;
      });
    }

    await addEvent();

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
