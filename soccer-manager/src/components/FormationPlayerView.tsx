import { IconButton, Tooltip } from "@mui/material";
import Globals from "../Globals";
import { PositionType, ViewVariant } from "../Types";

export interface IProps {
  positionType: PositionType;
  playerName?: string;
  image: string;
  variant?: ViewVariant;
  yellowCard?: boolean;
  suspended?: boolean;
}

function FormationPlayerView({
  positionType,
  playerName,
  image,
  yellowCard,
  suspended,
  variant = ViewVariant.STANDARD,
}: IProps) {
  const borderColor = Globals.functions.mapCardColorToBorderColor(
    Globals.functions.mapPositionTypeToColor(positionType),
    yellowCard,
    suspended
  );

  return (
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
  );
}

export default FormationPlayerView;
