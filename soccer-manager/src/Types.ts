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
import { AlertColor, PaletteMode } from "@mui/material";
import { IconType } from "react-icons";
import Globals from "./Globals";
import React from "react";

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
  settingsExists: boolean;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  enableBottomMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setNavbarColor: React.Dispatch<React.SetStateAction<NavbarColors>>;
  setSettingsExist: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITeamHistoryInfo {
  id: string;
  teamId: string;
  team: {
    teamName: string;
  };
  from: string;
  to?: string;
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
  playerRating: number;
  potentialRating: number;
  positionType: PositionType;
  playerNumber: number;
  image: string;
  condition: number;
  countryCode: string;
  foot: "L" | "R";
  currentTeamData: IShortTeamInfo;
  wage: number;
  marketValue: number;
  isOnSale: boolean;
  contractTo: string;
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
  formation: string;
  setFormation: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISquadFormationShape {
  defenders: number;
  midfielders: number;
  strikers: number;
}

export interface ITacticsPlayerViewProps {
  playerId: string;
  playerName: string;
  playerRating: number;
  positionType: PositionType;
  image: string;
  isBenched?: boolean;
  injuredTill?: Date;
  squadPosition?: number;
  suspended?: boolean;
  yellowCard?: boolean;
  condition: number;
}

export interface IPlayerSquadInfo extends ITacticsPlayerViewProps {
  squadPosition?: number;
  playerNumber: number;
  isInAcademy?: boolean;
  team?: {
    formation?: string;
  };
}

export interface IMatchCalendarInfo {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
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
  team: {
    id: string;
    name: string;
    logo: {
      mainColor: string;
    };
  };
  points: number;
  wins: number;
  draws: number;
  lost: number;
  form?: GameResultType[];
  league: {
    name: string;
  };
}

export interface IFinanceProfits {
  teamProfits: {
    transfers: number;
    stadium: number;
    season: number;
  }[];
}

export interface IFinanceSpendings {
  teamSpendings: {
    transfers: number;
    salaries: number;
    season: number;
  }[];
}

export interface ITeamAttribute {
  mainColor: string;
  secondaryColor: string;
}

export interface ISoccerShirt extends ITeamAttribute {
  type: SoccerShirtType;
  isSecond?: boolean;
}

export interface ISoccerLogo extends ITeamAttribute {
  name: string;
  type: SoccerLogoType;
  iconId: string;
}

export interface IStadiumSettings {
  stadiumId?: string;
  stadiumName: string;
  capacity: number;
  seatQuality: number;
  fansExtrasQuality: number;
}

export interface IAcademySettings {
  academyId?: string;
  secondTeamName: string;
  managerQuality: number;
  facilitiesQuality: number;
}

export interface IFacilitySettings {
  stadium: IStadiumSettings;
  academy: IAcademySettings;
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
  teamId: string;
  userId: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setTeamId: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export enum TransferFilterType {
  NUMERIC,
  MONEY,
}

export enum SoccerShirtType {
  PLAIN = "PLAIN",
  STRIPES_SIMPLE = "STRIPES_SIMPLE",
  STRIPES_45 = "STRIPES_45",
  STRIPES_180 = "STRIPES_180",
  CIRCLE = "CIRCLE",
}

export type SoccerLogoType = SoccerShirtType;

export interface IconImage {
  id: string;
  iconName: string;
  icon: IconType;
}

export interface IToastInfo {
  message: string;
  type: AlertColor;
}

export interface IGeneralPayload {
  errorMessage: string;
}

export interface IUserAdminInfo {
  email: string;
  lockoutEnabled: boolean;
}

export interface IPlayerTransfers {
  transfers: PlayerTransferType[];
}

export interface ITeamShirts {
  shirts: ISoccerShirt[];
}
export interface ITeamInfoData {
  logo: ISoccerLogo;
  name: string;
  formation: string;
  players: IPlayerSquadInfo[];
}
export interface ITeamInfoView {
  teams: {
    nodes: ITeamInfoData[];
  };
}

export enum PositionType {
  GOALKEEPER = "GOALKEEPER",
  DEFENDER = "DEFENDER",
  MIDFIELDER = "MIDFIELDER",
  STRIKER = "STRIKER",
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
  LEAGUE = "LEAGUE",
  FRIENDLY = "FRIENDLY",
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
