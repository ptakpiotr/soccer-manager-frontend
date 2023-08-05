import { object, number, mixed, string, boolean } from "yup";
import { EventType, IMatchCalendarInfo, ITrainingCalendarInfo } from "./Types";

export const playerRatingSchema = object({
  rating: number().min(0).max(5).required(),
});

export const eventSchema = object({
  id: string().required(),
  eventType: mixed<EventType>().required(),
  eventDetails: mixed<ITrainingCalendarInfo | IMatchCalendarInfo>().required(),
  year: number().moreThan(1900).lessThan(2100).required(),
  month: number().moreThan(0).lessThan(13).required(),
  day: number().moreThan(0).lessThan(32).required(),
  past: boolean(),
});
