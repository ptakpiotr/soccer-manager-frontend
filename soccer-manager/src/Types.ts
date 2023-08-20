import { InferType } from "yup";
import {
  eventSchema,
  loginSchema,
  playerRatingSchema,
  registerSchema,
} from "./Validation";
import { PaletteMode } from "@mui/material";
import { IconType } from "react-icons";
export interface IUserSettings {
  mode: PaletteMode;
  bottomMenu: boolean;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  enableBottomMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
  ground: "home" | "away";
  homeScore?: number;
  awayScore?: number;
}

export interface ITrainingCalendarInfo {
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

export enum SoccerShirtType {
  PLAIN = "Plain",
  STRIPES_SIMPLE = "Simple stripes",
  STRIPES_45 = "Stripes 45",
}

export type SoccerLogoType = SoccerShirtType;

export interface IconImage {
  id: string;
  iconName: string;
  icon: IconType;
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

export type PlayerRating = InferType<typeof playerRatingSchema>;
export type CalendarEvent = InferType<typeof eventSchema>;
export type RegisterType = InferType<typeof registerSchema>;
export type LoginType = InferType<typeof loginSchema>;