import { MdCalendarMonth, MdSettings, MdTableBar } from "react-icons/md";
import { PositionType, TrainingType, ViewVariant } from "./Types";

export default {
  functions: {
    mapPositionTypeToColor(positionType: PositionType) {
      switch (positionType) {
        case PositionType.GOALKEEPER:
          return "#1d3557";
        case PositionType.DEFENDER:
          return "#457b9d";
        case PositionType.MIDFIELDER:
          return "#a8dadc";
        case PositionType.STRIKER:
          return "#9913D2";
      }
    },
    mapTrainingTypeToColor(positionType: TrainingType) {
      switch (positionType) {
        case TrainingType.GOALKEEPER:
          return "#1d3557";
        case TrainingType.DEFENDER:
          return "#457b9d";
        case TrainingType.MIDFIELDER:
          return "#a8dadc";
        case TrainingType.FORWARD:
          return "#9913D2";
        case TrainingType.DEFAULT:
          return "#9F8170";
        case TrainingType.REST:
          return "#F04A00";
      }
    },
    mapPositionTypeToShortName(positionType: PositionType) {
      switch (positionType) {
        case PositionType.GOALKEEPER:
          return "GK";
        case PositionType.DEFENDER:
          return "DF";
        case PositionType.MIDFIELDER:
          return "MF";
        case PositionType.STRIKER:
          return "ST";
      }
    },
    mapViewVariantToMaxWidth(viewVariant: ViewVariant) {
      switch (viewVariant) {
        case ViewVariant.SMALL:
          return "25px";
        case ViewVariant.STANDARD:
          return "50px";
        case ViewVariant.BIG:
          return "75px";
      }
    },
    mapCardColorToBorderColor(
      color: string,
      yellowCard?: boolean,
      redCard?: boolean
    ) {
      if (redCard) {
        return "#e63946";
      } else if (yellowCard) {
        return "#E6E339";
      }

      return color;
    },
  },
  navigation: [
    {
      itemText: "Tactics",
      itemIcon: MdTableBar,
      url: "/tactics",
    },
    {
      itemText: "Calendar",
      itemIcon: MdCalendarMonth,
      url: "/calendar",
    },
    {
      itemText: "Settings",
      itemIcon: MdSettings,
      url: "/settings",
    },
  ],
};
