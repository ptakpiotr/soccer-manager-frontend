import { List, ListItem } from "@mui/material";
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
  return (
    <List className="player-history-list">
      {teamHistorySorted.map((t) => (
        <ListItem key={t.id} className="player-history-list-item">
            {t.from.toLocaleDateString()} - {t.to?.toLocaleDateString()} | {t.teamName}
        </ListItem>
      ))}
    </List>
  );
}

export default PlayerTeamHistory;
