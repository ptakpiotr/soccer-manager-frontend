import { List, ListItem, Typography } from "@mui/material";
import { ITeamHistoryInfo } from "../../Types";
import { useMemo } from "react";
import Enumerable from "linq";

interface IProps {
  teamHistory: ITeamHistoryInfo[];
}

function PlayerTeamHistory({ teamHistory }: IProps) {
  const teamHistorySorted = useMemo(
    () =>
      Enumerable.from(teamHistory)
        .orderByDescending((o) => o.to)
        .toArray(),
    [teamHistory]
  );
  if (teamHistory && teamHistory.length > 0) {
    return (
      <>
        <Typography variant="h6">Team history</Typography>

        <List className="player-history-list">
          {teamHistorySorted.map((t) => (
            <ListItem key={t.id} className="player-history-list-item">
              {new Date(t.from).toLocaleDateString()} -{" "}
              {t.to ? new Date(t.to).toLocaleDateString() : ""} |{" "}
              {t.team.teamName}
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return <></>;
}

export default PlayerTeamHistory;
