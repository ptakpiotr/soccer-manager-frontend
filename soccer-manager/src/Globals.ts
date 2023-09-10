import {
  MdCalendarMonth,
  MdPeople,
  MdSettings,
  MdTableBar,
  MdTableView,
  MdSchool,
  MdBuild
} from "react-icons/md";
import { GiCastle, GiChicken, GiFalconMoon, GiFlamer, GiHorseHead } from "react-icons/gi";
import { PositionType, TrainingType, ViewVariant, IconImage, GroundType } from "./Types";

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
    mapGroundTypeToColor(groundType: GroundType){
      switch(groundType){
        case GroundType.HOME:
          return "#F24C00";
        case GroundType.AWAY:
          return "#485696";
        default:
          return "#9D514B";
      }
    }
  },
  navigation: [
    {
      itemText: "Team",
      itemIcon: MdPeople,
      url: "/team",
    },
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
      itemText: "Table",
      itemIcon: MdTableView,
      url: "/table",
    },
    {
      itemText: "Academy",
      itemIcon: MdSchool,
      url: "/academy",
    },
    {
      itemText: "Facilities",
      itemIcon: MdBuild,
      url: "/facilities",
    },
    {
      itemText: "Settings",
      itemIcon: MdSettings,
      url: "/settings",
    },
  ],
  availableLogoIcons: [
    {
      id: "gi-falcon",
      iconName: "falcon",
      icon: GiFalconMoon,
    },
    {
      id: "gi-castle-1",
      iconName: "castle",
      icon: GiCastle,
    },
    {
      id: "gi-horse",
      iconName: "horse",
      icon: GiHorseHead,
    },
    {
      id: "gi-flamer",
      iconName: "flamer",
      icon: GiFlamer,
    },
    {
      id: "gi-chicken",
      iconName: "chicken",
      icon: GiChicken,
    },
  ] as IconImage[],
};
