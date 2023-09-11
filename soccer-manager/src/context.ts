import { createContext } from "react";
import { IContextMenu, ITactics, IUserSettings } from "./Types.ts";

const userSettingsInitialValue: Partial<IUserSettings> = {
  mode: "light",
  bottomMenu: false,
};

const tacticsInitialValue: Partial<ITactics> = {};

const contextMenuInitialValue: Partial<IContextMenu> = {
  settings: [],
};

export const UserSettingsContext = createContext<Partial<IUserSettings>>(
  userSettingsInitialValue
);

export const TacticsContext =
  createContext<Partial<ITactics>>(tacticsInitialValue);

export const ContextMenuContext = createContext<Partial<IContextMenu>>(
  contextMenuInitialValue
);
