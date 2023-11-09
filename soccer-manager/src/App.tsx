import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Tactics from "./pages/Tactics";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import {
  TacticsContext,
  UserSettingsContext,
  UserTokenContext,
} from "./context";
import Settings from "./pages/Settings";
import { IPlayerSquadInfo, NavbarColors } from "./Types";
import BottomMenu from "./components/BottomMenu";
import Calendar from "./pages/Calendar";
import Table from "./pages/Table";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Academy from "./pages/Academy";
import Facilities from "./pages/Facilities";
import Player from "./pages/Player";
import Transfers from "./pages/Transfers";
import Budget from "./pages/Budget";
import TeamInfo from "./pages/TeamInfo";
import MatchCentre from "./pages/MatchCentre";
import NotFound from "./pages/NotFound";
import ManageAccount from "./pages/ManageAccount";
import ChangePassword from "./pages/ChangePassword";
import AuthorizedArea from "./AuthorizedArea";
import Logout from "./components/Account/Logout";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useAppGQLQueries } from "./hooks/useAppGQLQueries";
import "react-toastify/dist/ReactToastify.css";
import LoadData from "./pages/LoadData";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [bottomMenu, enableBottomMenu] = useState<boolean>(false);
  const [navbarColor, setNavbarColor] = useState<NavbarColors>("#228b22");
  const [settingsExist, setSettingsExist] = useState<boolean>(false);
  const [squad, setSquad] = useState<IPlayerSquadInfo[]>([]);
  const [reserve, setReserve] = useState<IPlayerSquadInfo[]>([]);
  const [formation, setFormation] = useState<string>("4-3-3");

  //inspired with here: https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") ?? ""
  );
  const [teamId, setTeamId] = useState<string>(
    localStorage.getItem("teamId") ?? ""
  );
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("userId") ?? ""
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: navbarColor as string,
          },
          background: {
            default: "#ffffff",
          },
          mode,
        },
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                "&:hover": {
                  cursor: "pointer",
                },
              },
            },
          },
        },
      }),
    [mode, navbarColor]
  );

  useAppGQLQueries({
    enableBottomMenu,
    setFormation,
    setMode,
    setNavbarColor,
    setReserve,
    setSettingsExist,
    setSquad,
    teamId,
    userId,
  });

  return (
    <UserTokenContext.Provider
      value={{
        token,
        teamId,
        userId,
        setToken,
        setTeamId,
        setUserId,
      }}
    >
      <UserSettingsContext.Provider
        value={{
          mode,
          bottomMenu,
          navbarColor,
          settingsExists: settingsExist,
          setMode,
          enableBottomMenu,
          setNavbarColor,
          setSettingsExist,
        }}
      >
        <TacticsContext.Provider
          value={{
            squad,
            reserve,
            formation,
            setSquad,
            setReserve,
            setFormation,
          }}
        >
          <ThemeProvider theme={theme}>
            <div className={mode === "light" ? "light-mode" : "dark-mode"}>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/register" Component={Register} />
                  <Route path="/login" Component={Login} />
                  <Route path="/forgotPassword" Component={ForgotPassword} />
                  <Route path="/manageAccount" Component={ManageAccount} />
                  <Route path="/changePassword" Component={ChangePassword} />
                  <Route path="/resetPassword" Component={ResetPassword} />

                  <Route path="/" Component={AuthorizedArea}>
                    <Route path="/" Component={Home} />
                    <Route path="/loadData" Component={LoadData} />
                    <Route path="/tactics" Component={Tactics} />
                    <Route path="/calendar" Component={Calendar} />
                    <Route path="/table" Component={Table} />
                    <Route path="/academy" Component={Academy} />
                    <Route path="/facilities" Component={Facilities} />
                    <Route path="/player/:id" Component={Player} />
                    <Route path="/transfers" Component={Transfers} />
                    <Route path="/budget" Component={Budget} />
                    <Route path="/team/:id" Component={TeamInfo} />
                    <Route path="/match/:id" Component={MatchCentre} />

                    <Route path="settings" Component={Settings} />
                    <Route path="/logout" Component={Logout} />
                  </Route>
                  <Route path="*" Component={NotFound} />
                </Routes>
                <BottomMenu />
              </BrowserRouter>
              <ToastContainer />
            </div>
          </ThemeProvider>
        </TacticsContext.Provider>
      </UserSettingsContext.Provider>
    </UserTokenContext.Provider>
  );
}

export default App;
