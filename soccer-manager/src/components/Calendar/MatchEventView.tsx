import { MdStadium } from "react-icons/md";
import { CalendarEvent, GroundType, IMatchCalendarInfo } from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";
import { useState } from "react";
import MatchModal from "./MatchModal";
import Scoreboard from "../misc/Scoreboard";
import SoccerLogoDisplay from "../misc/SoccerLogoDisplay";

interface IProps {
  eventData: CalendarEvent;
  editEvent: () => Promise<void>;
}

function MatchEventView({ eventData, editEvent }: IProps) {
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
          <Grid flex={1} item className="calendar-day">
            {day}
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
              isMyTeamHome={matchInfo.ground === GroundType.HOME}
            />
          ) : (
            <strong>Match yet to be played</strong>
          )}
        </Grid>
        <Grid container>
          <Grid item marginTop={"3rem"}>
            <SoccerLogoDisplay
              logoSetup={{ name: "", ...matchInfo.awayTeam.logo }}
              additionalClasses={["player-soccer-team-logo"]}
            />
          </Grid>
        </Grid>
      </Grid>
      <MatchModal
        isOpen={isModalOpen[1]}
        setOpen={setModalOpen}
        addEvent={editEvent}
        calendarEventDetails={eventData}
      />
    </>
  );
}

export default MatchEventView;
