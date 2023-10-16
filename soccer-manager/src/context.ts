import { createContext } from "react";
import { ITactics, IUserSettings, IErrorInfo, IUserToken } from "./Types.ts";

const userSettingsInitialValue: Partial<IUserSettings> = {
  mode: "light",
  bottomMenu: false,
};

const tacticsInitialValue: Partial<ITactics> = {};

const errorInfoInitialValue: Partial<IErrorInfo> = {};

const userTokenInitialValue: Partial<IUserToken> = {};

export const UserSettingsContext = createContext<Partial<IUserSettings>>(
  userSettingsInitialValue
);

export const TacticsContext =
  createContext<Partial<ITactics>>(tacticsInitialValue);

export const ErrorViewContext = createContext<Partial<IErrorInfo>>(
  errorInfoInitialValue
);

export const UserTokenContext = createContext<Partial<IUserToken>>(
  userTokenInitialValue
);
