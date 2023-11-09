import { MdStadium } from "react-icons/md";
import { CalendarEvent, IMatchCalendarInfo, MatchType } from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";
import { useState } from "react";
import MatchModal from "./MatchModal";
import Scoreboard from "../misc/Scoreboard";

interface IProps {
  eventData: CalendarEvent;
}

function MatchEventView({ eventData }: IProps) {
  const { match, day } = eventData;
  const matchInfo = match as IMatchCalendarInfo;
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
            {MatchType[matchInfo.type]}
          </Grid>
          <Grid item>
            <MdStadium
              color={Globals.functions.mapGroundTypeToColor(matchInfo.ground)}
              size={"3rem"}
            />
          </Grid>
        </Grid>
        <Grid container>
          {matchInfo.homeScore && matchInfo.awayScore ? (
            <Scoreboard
              homeScore={matchInfo.homeScore}
              awayScore={matchInfo.awayScore}
              isMyTeamHome={true}
            />
          ) : (
            <strong>Match yet to be played</strong>
          )}
        </Grid>
        <Grid container>
          <Grid flex={1} item textAlign={"left"}>
            {day}
          </Grid>
          <Grid item>TODO: LOGO HERE {matchInfo.awayTeamId}</Grid>
        </Grid>
      </Grid>
      <MatchModal
        isOpen={isModalOpen[1]}
        setOpen={setModalOpen}
        calendarEventDetails={eventData}
      />
    </>
  );
}

export default MatchEventView;
