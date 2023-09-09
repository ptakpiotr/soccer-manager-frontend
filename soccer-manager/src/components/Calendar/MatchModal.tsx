import {
  Button,
  Dialog,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { CalendarEvent, GroundType, IMatchCalendarInfo } from "../../Types";
import { MdEventBusy } from "react-icons/md";
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
const groundTypes = (Object.keys(GroundType) as Array<keyof GroundType>)
  .map((k) => {
    const numK = Number(k);
    if (numK || numK === 0) {
      return {
        value: numK,
        desc: GroundType[numK],
      };
    }
  })
  .filter((k) => k) as {
  value: number;
  desc: string;
}[];

const teamList = [
  {
    value: 1,
    desc: "TEAM A",
  },
  {
    value: 2,
    desc: "TEAM B",
  },
];

function MatchModal({
  isOpen,
  setOpen,
  calendarEventDetails,
  setCalendarEventDetails,
}: IProps) {
  const [matchCalendarInfo, setMatchCalendarInfo] =
    useState<IMatchCalendarInfo>(
      calendarEventDetails.eventDetails as IMatchCalendarInfo
    );

  const handleGroundTypeChange = (e: SelectChangeEvent<number>) => {
    setMatchCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.ground = e.target.value as GroundType;
      return newEventDetails;
    });
  };

  const handleRivalTeamChange = (e: SelectChangeEvent<number>) => {
    setMatchCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.rivalTeamId = e.target.value as number;
      return newEventDetails;
    });
  };

  const handleAddSecondStep = () => {
    setCalendarEventDetails((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.eventDetails = matchCalendarInfo;

      return newEventDetails;
    });

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
          elementName="rival-team"
          label="Rival team"
          value={matchCalendarInfo?.rivalTeamId ?? 1}
          elements={teamList}
          handleChange={handleRivalTeamChange}
          isNotEditable={calendarEventDetails.notEditable}
          notEditableValue={teamList[matchCalendarInfo?.rivalTeamId ?? 1].desc}
        />
        <AppSelectField
          elementName="ground-type"
          label="Ground type"
          value={matchCalendarInfo?.ground ?? GroundType.NEUTRAL}
          elements={groundTypes}
          handleChange={handleGroundTypeChange}
          isNotEditable={calendarEventDetails.notEditable}
          notEditableValue={GroundType[matchCalendarInfo?.ground]}
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

export default MatchModal;
