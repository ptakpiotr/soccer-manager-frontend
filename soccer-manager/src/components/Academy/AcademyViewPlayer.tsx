import { IPlayerSquadInfo } from "../../Types";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import TacticsPlayerView from "../TacticsPlayerView";
import { useState } from "react";

interface IProps {
  isPromotion: boolean;
  playerInfo: IPlayerSquadInfo;
  updateList: (playerId: string) => void;
}

function AcademyViewPlayer({ playerInfo, isPromotion, updateList }: IProps) {
  const [isPlayerChecked, setIsPlayerChecked] = useState<boolean>(false);

  return (
    <ListItem>
      <ListItemButton
        onClick={() => {
          updateList(playerInfo.playerId);
          setIsPlayerChecked((prev) => !prev);
        }}
      >
        <ListItemIcon>
          <Checkbox
            checked={isPlayerChecked}
            disableRipple={true}
            color={isPromotion ? "info" : "error"}
          />
        </ListItemIcon>
        <TacticsPlayerView {...playerInfo} disableRipple={true} />
      </ListItemButton>
    </ListItem>
  );
}

export default AcademyViewPlayer;
