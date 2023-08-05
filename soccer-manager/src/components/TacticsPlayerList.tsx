import { List } from "@mui/material";
import DraggablePlayerView from "./DraggablePlayerView";
import { useContext } from "react";
import { TacticsContext } from "../context";

function TacticsPlayerList() {
  const { reserve } = useContext(TacticsContext);
  return (
    <List
      sx={{
        overflow: "auto",
        maxHeight: "350px",
      }}
    >
      {reserve?.map((r) => (
        <DraggablePlayerView key={r.playerId} {...r} />
      ))}
    </List>
  );
}

export default TacticsPlayerList;
