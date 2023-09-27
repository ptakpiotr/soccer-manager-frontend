import { IconButton, Tooltip } from "@mui/material";
import Globals from "../Globals";
import { PositionType, ViewVariant } from "../Types";
import { Link } from "react-router-dom";

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
  const widthAndHeight = Globals.functions.mapViewVariantToMaxWidth(variant);

  const borderColor = Globals.functions.mapCardColorToBorderColor(
    Globals.functions.mapPositionTypeToColor(positionType),
    yellowCard,
    suspended
  );

  return (
    <Link to={`/player/${id}`}>
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
          <div
            className="formation-player-image"
            style={{
              backgroundImage: `url("${image}.png")`,
              width: widthAndHeight,
              height: widthAndHeight,
            }}
          ></div>
        </IconButton>
      </Tooltip>
    </Link>
  );
}

export default FormationPlayerView;
