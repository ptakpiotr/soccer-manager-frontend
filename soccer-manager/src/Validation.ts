import { object, number, mixed, string, boolean, ref } from "yup";
import {
  EventType,
  IMatchCalendarInfo,
  IShortTeamInfo,
  ITrainingCalendarInfo,
  PlayerRating,
} from "./Types";

export const playerRatingSchema = object({
  rating: number().min(0).max(5).required(),
});

export const eventSchema = object({
  id: string(),
  eventType: mixed<EventType>().required(),
  match: mixed<IMatchCalendarInfo>(),
  training: mixed<ITrainingCalendarInfo>(),
  year: number().moreThan(1900).lessThan(2100).required(),
  month: number().moreThan(0).lessThan(13).required(),
  day: number().moreThan(0).lessThan(32).required(),
  notEditable: boolean(),
  description: string(),
});

export const registerSchema = object({
  email: string()
    .email("Must be valid email")
    .required("Email address is required"),
  password: string().min(8).required("Password must be min 8 characters long"),
  confirmPassword: string().oneOf(
    [ref("password")],
    "Password values must match"
  ),
});

export const loginSchema = object({
  email: string().email().required("Email address is required"),
  password: string().required("Password is required"),
});

export const playerTransferSchema = object({
  id: string().required(),
  playerName: string().required(),
  age: number().required().lessThan(50).moreThan(10),
  playerRating: number().required(),
  potentialRating: number().required(),
  marketValue: number().required(),
  wage: number().required(),
  teamInfo: mixed<IShortTeamInfo>(),
});

export const changePasswordSchema = object({
  currentPassword: string().required(),
  newPassword: string().required(),
  confirmedPassword: string().oneOf(
    [ref("newPassword")],
    "Password values must match"
  ),
});

export const resetPasswordSchema = object({
  email: string().required(),
  password: string().required(),
  confirmedPassword: string().oneOf(
    [ref("password")],
    "Password values must match"
  ),
  token: string().required(),
});

//regex pattern from: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
export const guidSchema = object({
  teamId: string().matches(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  ),
});

//shared schema
const teamAttributeSchema = object().shape({
  mainColor: string().required(),
  secondaryColor: string().required(),
});

export const soccerShirtSchema = teamAttributeSchema.shape({
  type: string().required(),
  isSecond: boolean(),
});

export const soccerLogoSchema = teamAttributeSchema.shape({
  name: string().required(),
  type: string().required(),
  iconId: string().required(),
});
