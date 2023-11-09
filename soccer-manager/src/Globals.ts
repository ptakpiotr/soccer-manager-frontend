import {
  MdCalendarMonth,
  MdPeople,
  MdSettings,
  MdTableBar,
  MdTableView,
  MdSchool,
  MdBuild,
  MdTransferWithinAStation,
  MdOutlineMoney,
} from "react-icons/md";
import {
  GiCastle,
  GiChicken,
  GiFalconMoon,
  GiFlamer,
  GiHorseHead,
} from "react-icons/gi";
import {
  PositionType,
  TrainingType,
  ViewVariant,
  IconImage,
  GroundType,
  TransferFilterKeys,
  ISoccerLogo,
  SoccerShirtType,
} from "./Types";

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
    mapGroundTypeToColor(groundType: GroundType) {
      switch (groundType) {
        case GroundType.HOME:
          return "#F24C00";
        case GroundType.AWAY:
          return "#485696";
        default:
          return "#9D514B";
      }
    },
    buildDynamicFilteredGraphQLQuery(
      teamId: string,
      filters: TransferFilterKeys
    ) {
      const whereClauseConditions = (
        Object.keys(filters) as (keyof TransferFilterKeys)[]
      )
        .filter((f) => filters[f]?.from || filters[f]?.to)
        .map(
          (f) => `${f}:{
          ${filters[f]?.from ? `gt:${filters[f]?.from}` : ""}
          ${filters[f]?.to ? `lt:${filters[f]?.to}` : ""}
        }`
        );
      return `
        query{
          transfers(teamId: "${teamId}" , where: {
            ${whereClauseConditions.join(",")}
          }){
            id
            playerName
            playerRating
            age
            potentialRating
            marketValue
            wage
          }
        }
      `;
    },
  },
  navigation: [
    {
      itemText: "Team",
      itemIcon: MdPeople,
      url: "/",
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
    {
      itemText: "Transfers",
      itemIcon: MdTransferWithinAStation,
      url: "/transfers",
    },
    {
      itemText: "Budget",
      itemIcon: MdOutlineMoney,
      url: "/budget",
    },
  ] as const,
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
  availableFilters: [
    {
      filterName: "Age",
      filterKey: "age",
    },
    {
      filterName: "Rating",
      filterKey: "rating",
    },
    {
      filterName: "Potential rating",
      filterKey: "potentialRating",
    },
    {
      filterName: "Market value",
      filterKey: "marketValue",
    },
    {
      filterName: "Wage",
      filterKey: "wage",
    },
  ] as {
    filterName: string;
    filterKey: keyof TransferFilterKeys;
  }[],
  availableColors: ["#228b22", "#0CA4A5", "#055B67", "#797A7D"] as const,
};

export const defaultLogoSetup: ISoccerLogo = {
  mainColor: "#0000FF",
  secondaryColor: "#FF0000",
  type: SoccerShirtType.STRIPES_SIMPLE,
  name: "",
  iconId: "gi-chicken",
};

export const defaultKitSetup = {
  mainColor: "#0000FF",
  secondaryColor: "#FF0000",
  type: SoccerShirtType.STRIPES_SIMPLE,
};
