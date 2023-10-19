import { InferType } from "yup";
import {
  changePasswordSchema,
  eventSchema,
  loginSchema,
  playerRatingSchema,
  playerTransferSchema,
  registerSchema,
  resetPasswordSchema,
} from "./Validation";
import { PaletteMode } from "@mui/material";
import { IconType } from "react-icons";
import Globals from "./Globals";

type MapPropertyToFilter<T> = {
  -readonly [Property in keyof T]: {
    from?: T[Property];
    to?: T[Property];
  };
};

export interface IUserSettings {
  mode: PaletteMode;
  bottomMenu: boolean;
  navbarColor: NavbarColors;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  enableBottomMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setNavbarColor: React.Dispatch<React.SetStateAction<NavbarColors>>;
}

export interface ITeamHistoryInfo {
  id: string;
  teamId: string;
  teamName: string;
  from: Date;
  to?: Date;
}

export interface IContractInfo {
  id: string;
  playerId: string;
  marketValue: number;
  wage: number;
  to: Date;
}

export interface IShortTeamInfo {
  teamId: string;
  teamLogo: ISoccerLogo;
}

export interface IPlayerAdditionalInfo {
  isBenched?: boolean;
  injuredTill?: Date;
  suspended?: boolean;
  yellowCard?: boolean;
  age: number;
  teamHistory: ITeamHistoryInfo[];
}

export interface IPlayerInfo extends IPlayerAdditionalInfo {
  id: string;
  playerName: string;
  playerRating: PlayerRating;
  potentialRating: PlayerRating;
  positionType: PositionType;
  playerNumber: number;
  image: string;
  condition: number;
  countryCode: string;
  foot: "L" | "R";
  currentTeamData: IShortTeamInfo;
}

export interface IPlayerTableInfo {
  positionType: PositionType;
  playerRating: PlayerRating;
  potentialRating: PlayerRating;
  foot: "L" | "R";
  condition: number;
}

export interface ITactics {
  squad: IPlayerSquadInfo[];
  setSquad: React.Dispatch<React.SetStateAction<IPlayerSquadInfo[]>>;
  reserve: IPlayerSquadInfo[];
  setReserve: React.Dispatch<React.SetStateAction<IPlayerSquadInfo[]>>;
}

export interface ISquadFormationShape {
  defenders: number;
  midfielders: number;
  strikers: number;
}

export interface ITacticsPlayerViewProps {
  playerId: string;
  playerName: string;
  playerRating: PlayerRating;
  positionType: PositionType;
  image: string;
  isBenched?: boolean;
  injuredTill?: Date;
  suspended?: boolean;
  yellowCard?: boolean;
  condition: number;
}

export interface IPlayerSquadInfo extends ITacticsPlayerViewProps {
  isInSquad: boolean;
  squadPosition?: number;
  number: number;
}

export interface IMatchCalendarInfo {
  rivalTeamId: number;
  ground: GroundType;
  type: MatchType;
  homeScore?: number;
  awayScore?: number;
}

export interface ITrainingCalendarInfo {
  id?: number;
  trainingType: TrainingType;
}

export interface ITableTeamInfo {
  id: number;
  name: string;
  points: number;
  wins: number;
  draws: number;
  lost: number;
  form?: GameResultType[];
  teamColor: string;
}

export interface IFinancePerformance {
  monthlyPerformance: {
    month: number;
    money: number;
  }[];
}

export interface ITeamAttribute {
  mainColor: string;
  secondaryColor: string;
}

export interface ISoccerShirt extends ITeamAttribute {
  type: SoccerShirtType;
}

export interface ISoccerLogo extends ITeamAttribute {
  name: string;
  type: SoccerLogoType;
  iconId: string;
}

export interface IStadiumSettings {
  stadiumName: string;
  capacity: number;
  seatQuality: number;
  fansExtrasQuality: number;
}

export interface IAcademySettings {
  secondTeamName: string;
  capacity: number;
  managerQuality: number;
  facilitiesQuality: number;
}

export type TransferFilterKeys = Partial<
  MapPropertyToFilter<Omit<PlayerTransferType, "teamInfo" | "id" | "name">>
>;

export interface ITransferFilter<U> {
  readonly filterType: TransferFilterType;
  readonly filterKey: keyof TransferFilterKeys;
  readonly label: string;
  from?: U;
  to?: U;
  setValue: (filterKey: keyof TransferFilterKeys, from?: U, to?: U) => void;
  validateFilter?: (filterValue: { from?: U; to?: U }) => boolean;
}

export interface IUserToken {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export enum TransferFilterType {
  NUMERIC,
  MONEY,
}

export enum SoccerShirtType {
  PLAIN = "Plain",
  STRIPES_SIMPLE = "Simple stripes",
  STRIPES_45 = "Stripes 45",
  STRIPES_180 = "Stripes 180",
  CIRCLE = "Circle",
}

export type SoccerLogoType = SoccerShirtType;

export interface IconImage {
  id: string;
  iconName: string;
  icon: IconType;
}

export interface IErrorInfo {
  errorMessage: string;
  errorCode?: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorCode: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface IUserAdminInfo {
  email: string;
  lockoutEnabled: boolean;
}

export enum PositionType {
  GOALKEEPER,
  DEFENDER,
  MIDFIELDER,
  STRIKER,
}

export enum ViewVariant {
  SMALL,
  STANDARD,
  BIG,
}

export enum EventType {
  NONE,
  MATCH,
  TRAINING,
}

export enum TrainingType {
  DEFAULT,
  GOALKEEPER,
  DEFENDER,
  MIDFIELDER,
  FORWARD,
  REST,
}

export enum GameResultType {
  WIN,
  DRAW,
  LOST,
}

export enum GroundType {
  NEUTRAL,
  HOME,
  AWAY,
}

export enum Months {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

export enum MatchType {
  LEAGUE,
  FRIENDLY,
}

export type PlayerRating = InferType<typeof playerRatingSchema>;
export type CalendarEvent = InferType<typeof eventSchema>;
export type RegisterType = InferType<typeof registerSchema>;
export type LoginType = InferType<typeof loginSchema>;
export type PlayerTransferType = Readonly<
  InferType<typeof playerTransferSchema>
>;
export type ChangePasswordType = InferType<typeof changePasswordSchema>;
export type ResetPasswordType = InferType<typeof resetPasswordSchema>;

export type NavbarColors =
  (typeof Globals.availableColors)[keyof typeof Globals.availableColors];
