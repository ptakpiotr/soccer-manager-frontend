import { createContext } from "react";
import { ITactics, IUserSettings, IErrorInfo } from "./Types.ts";

const userSettingsInitialValue: Partial<IUserSettings> = {
  mode: "light",
  bottomMenu: false,
};

const tacticsInitialValue: Partial<ITactics> = {};

const errorInfoInitialValue: Partial<IErrorInfo> = {};

export const UserSettingsContext = createContext<Partial<IUserSettings>>(
  userSettingsInitialValue
);

export const TacticsContext =
  createContext<Partial<ITactics>>(tacticsInitialValue);

export const ErrorViewContext = createContext<Partial<IErrorInfo>>(
  errorInfoInitialValue
);
