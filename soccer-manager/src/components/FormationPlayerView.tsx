import { Tooltip } from "@mui/material";
import Globals from "../Globals";
import { ViewVariant, ITacticsPlayerViewProps } from "../Types";
import { Link } from "react-router-dom";

type Props = Omit<
  ITacticsPlayerViewProps,
  "squadPosition" | "playerName" | "playerRating" | "condition"
> & {
  variant?: ViewVariant;
} & Partial<{
    playerName: string;
    playerRating: number;
    condition: number;
  }>;

function FormationPlayerView({
  playerId,
  positionType,
  playerName,
  image,
  yellowCard,
  suspended,
  variant = ViewVariant.STANDARD,
}: Props) {
  const widthAndHeight = Globals.functions.mapViewVariantToMaxWidth(variant);

  const borderColor = Globals.functions.mapCardColorToBorderColor(
    Globals.functions.mapPositionTypeToColor(positionType),
    yellowCard,
    suspended
  );

  return (
    <Link to={`/player/${playerId}`}>
      <Tooltip title={playerName ?? ""} arrow>
        <div
          style={{
            borderColor,
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "50%",
          }}
          className={`${
            variant != ViewVariant.SMALL ? "responsive-player-view" : ""
          }`}
        >
          <div
            className="formation-player-image"
            style={{
              backgroundImage: `url("${image}.png")`,
              width: widthAndHeight,
              height: widthAndHeight,
            }}
          ></div>
        </div>
      </Tooltip>
    </Link>
  );
}

export default FormationPlayerView;
