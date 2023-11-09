import { IPlayerSquadInfo } from "../../Types";
import { Checkbox, Grid, IconButton } from "@mui/material";
import TacticsPlayerView from "../TacticsPlayerView";
import { useState } from "react";

interface IProps {
  playerInfo: IPlayerSquadInfo;
  updateList: (playerId: string) => void;
}

function AcademyViewPlayer({ playerInfo, updateList }: IProps) {
  const [isPlayerChecked, setIsPlayerChecked] = useState<boolean>(false);

  return (
    <Grid
      container
      flexDirection="row"
      onClick={() => {
        updateList(playerInfo.playerId);
        setIsPlayerChecked((prev) => !prev);
      }}
    >
      <Grid item alignSelf="center">
        <IconButton>
          <Checkbox
            checked={isPlayerChecked}
            disableRipple={true}
            color={playerInfo.isInAcademy ? "info" : "error"}
          />
        </IconButton>
      </Grid>
      <Grid item flex={11}>
        <TacticsPlayerView {...playerInfo} disableRipple={true} />
      </Grid>
    </Grid>
  );
}

export default AcademyViewPlayer;
