import { createContext } from "react";
import { ITactics, IUserSettings } from "./Types.ts";

const userSettingsInitialValue: Partial<IUserSettings> = {
  mode: "light",
  bottomMenu: false,
};

const tacticsInitialValue: Partial<ITactics> = {};

export const UserSettingsContext = createContext<Partial<IUserSettings>>(
  userSettingsInitialValue
);

export const TacticsContext =
  createContext<Partial<ITactics>>(tacticsInitialValue);
