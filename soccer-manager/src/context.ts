import { createContext } from "react";
import { ITactics, IUserSettings, IUserToken } from "./Types.ts";

const userSettingsInitialValue: Partial<IUserSettings> = {
  mode: "light",
  bottomMenu: false,
};

const tacticsInitialValue: Partial<ITactics> = {};

const userTokenInitialValue: Partial<IUserToken> = {};

export const UserSettingsContext = createContext<Partial<IUserSettings>>(
  userSettingsInitialValue
);

export const TacticsContext =
  createContext<Partial<ITactics>>(tacticsInitialValue);

export const UserTokenContext = createContext<Partial<IUserToken>>(
  userTokenInitialValue
);
