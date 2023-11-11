import { Button, Dialog, Grid, SelectChangeEvent } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  CalendarEvent,
  GroundType,
  IMatchCalendarInfo,
  ITeamPickerData,
  MatchType,
} from "../../Types";
import { MdEventBusy } from "react-icons/md";
import { useQuery as useGQLQuery } from "@apollo/client";
import AppSelectField from "../AppSelectField";
import { GET_AVAILABLE_TEAMS } from "../../GraphQL/Queries/calendarQueries";
import { UserTokenContext } from "../../context";
import Loading from "../misc/Loading";
import NoData from "../misc/NoData";

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
const groundTypes = (Object.keys(GroundType) as Array<keyof GroundType>)
  .map((k: keyof GroundType) => {
    return {
      value: k,
      desc: k,
    };
  })
  .filter((k) => k) as {
  value: string;
  desc: string;
}[];

const matchTypes = (Object.keys(MatchType) as Array<keyof MatchType>)
  .map((k: keyof MatchType) => {
    return {
      value: k,
      desc: k,
    };
  })
  .filter((k) => k) as {
  value: string;
  desc: string;
}[];

function MatchModal({
  isOpen,
  setOpen,
  calendarEventDetails,
  setCalendarEventDetails,
  addEvent,
}: IProps) {
  const [matchCalendarInfo, setMatchCalendarInfo] =
    useState<IMatchCalendarInfo>(
      calendarEventDetails.match as IMatchCalendarInfo
    );
  const { teamId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<{
    availableTeams: ITeamPickerData[];
  }>(GET_AVAILABLE_TEAMS, {
    variables: {
      input: {
        teamId,
        year: calendarEventDetails.year,
        month: calendarEventDetails.month,
        day: calendarEventDetails.day,
      },
    },
    pollInterval: 3600 * 10,
  });

  const handleGroundTypeChange = (e: SelectChangeEvent<string>) => {
    setMatchCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.ground = e.target.value as GroundType;
      return newEventDetails;
    });
  };

  const handleRivalTeamChange = (e: SelectChangeEvent<string>) => {
    setMatchCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.awayTeamId = e.target.value as string;
      return newEventDetails;
    });
  };

  const handleMatchTypeChange = (e: SelectChangeEvent<string>) => {
    setMatchCalendarInfo((prev) => {
      let newEventDetails = {
        ...prev,
      };

      newEventDetails.type = e.target.value as MatchType;
      return newEventDetails;
    });
  };

  const handleAddSecondStep = async () => {
    if (setCalendarEventDetails) {
      setCalendarEventDetails((prev) => {
        let newEventDetails = {
          ...prev,
        };

        newEventDetails.match = matchCalendarInfo;

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
        {loading ? (
          <Loading />
        ) : data ? (
          <AppSelectField
            elementName="rival-team"
            label="Rival team"
            value={matchCalendarInfo?.awayTeamId ?? ""}
            elements={data.availableTeams}
            handleChange={handleRivalTeamChange}
            isNotEditable={calendarEventDetails.notEditable}
            notEditableValue={calendarEventDetails.match?.awayTeam.name ?? ""}
          />
        ) : (
          <NoData />
        )}
        <AppSelectField
          elementName="ground-type"
          label="Ground type"
          value={matchCalendarInfo?.ground ?? GroundType.NEUTRAL}
          elements={groundTypes}
          handleChange={handleGroundTypeChange}
          isNotEditable={calendarEventDetails.notEditable}
          notEditableValue={GroundType[matchCalendarInfo?.ground]}
        />
        <AppSelectField
          elementName="match-type"
          label="Match type"
          value={matchCalendarInfo?.type ?? MatchType.FRIENDLY}
          elements={matchTypes}
          handleChange={handleMatchTypeChange}
          isNotEditable={true}
          notEditableValue={MatchType[matchCalendarInfo?.type]}
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
