import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAppGQLQueries } from "../hooks/useAppGQLQueries";
import {
  TacticsContext,
  UserSettingsContext,
  UserTokenContext,
} from "../context";
import { ITactics, IUserSettings } from "../Types";

function LoadData() {
  const { userId, teamId } = useContext(UserTokenContext);
  const { enableBottomMenu, setMode, setNavbarColor, setSettingsExist } =
    useContext(UserSettingsContext) as NonNullable<IUserSettings>;
  const { setReserve, setFormation, setSquad } = useContext(
    TacticsContext
  ) as NonNullable<ITactics>;

  useAppGQLQueries({
    enableBottomMenu,
    setFormation,
    setMode,
    setNavbarColor,
    setReserve,
    setSettingsExist,
    setSquad,
    teamId: teamId!,
    userId: userId!,
  });

  return <Navigate to="/" />;
}

export default LoadData;
