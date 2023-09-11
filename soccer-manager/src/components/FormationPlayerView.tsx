import { IconButton, Tooltip } from "@mui/material";
import Globals from "../Globals";
import { PositionType, ViewVariant } from "../Types";
import useAppContextMenu from "../hooks/useAppContextMenu";
import { MdOpenInBrowser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppContextMenu from "./misc/AppContextMenu";

export interface IProps {
  id: string;
  positionType: PositionType;
  playerName?: string;
  image: string;
  variant?: ViewVariant;
  yellowCard?: boolean;
  suspended?: boolean;
  disableRipple?: boolean;
}

function FormationPlayerView({
  id,
  positionType,
  playerName,
  image,
  yellowCard,
  suspended,
  disableRipple,
  variant = ViewVariant.STANDARD,
}: IProps) {
  const navigate = useNavigate();
  const url = `player/${id}`;

  const borderColor = Globals.functions.mapCardColorToBorderColor(
    Globals.functions.mapPositionTypeToColor(positionType),
    yellowCard,
    suspended
  );

  return (
    <AppContextMenu
      contextMenuId={`player-info-menu-${id}`}
      customSettings={[
        {
          settingId: "player-info",
          icon: MdOpenInBrowser,
          settingDesc: "Open",
          settingItemHandler(_) {
            navigate(url);
          },
        },
      ]}
    >
      <Tooltip title={playerName ?? ""} arrow>
        <IconButton
          sx={{
            borderColor,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          className={`${
            variant != ViewVariant.SMALL ? "responsive-player-view" : ""
          }`}
          disableRipple={disableRipple}
        >
          <img
            src={image}
            loading="lazy"
            style={{
              maxWidth: Globals.functions.mapViewVariantToMaxWidth(variant),
            }}
          />
        </IconButton>
      </Tooltip>
    </AppContextMenu>
  );
}

export default FormationPlayerView;
