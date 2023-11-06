import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Tactics from "./pages/Tactics";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  ErrorViewContext,
  TacticsContext,
  UserSettingsContext,
  UserTokenContext,
} from "./context";
import Settings from "./pages/Settings";
import {
  IPlayerSquadInfo,
  IUserSettings,
  NavbarColors,
  PositionType,
} from "./Types";
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

import { useQuery as useGQLQuery } from "@apollo/client";
import { GET_USER_PREFERENCES } from "./GraphQL/Queries/settingsQueries";
import { GET_TACTICS_PLAYERS } from "./GraphQL/Queries/playerQueries";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [bottomMenu, enableBottomMenu] = useState<boolean>(false);
  const [navbarColor, setNavbarColor] = useState<NavbarColors>("#228b22");
  const [settingsExist, setSettingsExist] = useState<boolean>(false);
  const [squad, setSquad] = useState<IPlayerSquadInfo[]>([]);
  const [reserve, setReserve] = useState<IPlayerSquadInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorCode, setErrorCode] = useState<number>();

  //inspired with here: https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") ?? ""
  );
  const [teamId, setTeamId] = useState<string>(
    localStorage.getItem("teamId") ?? "e7c5612f-f3b1-49cc-99c8-f657742214ba"
  );
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("userId") ?? "3f2504e0-4f89-11d3-9a0c-0205e82c3308"
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

  const { data, loading } = useGQLQuery<{ userPreferences?: IUserSettings }>(
    GET_USER_PREFERENCES,
    {
      variables: {
        userId,
      },
      pollInterval: 3600000,
    }
  );

  const { data: gqlSquad, loading: squadLoading } = useGQLQuery<{
    players: { nodes: IPlayerSquadInfo[] };
  }>(GET_TACTICS_PLAYERS, {
    variables: {
      teamId,
    },
    pollInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!loading && data?.userPreferences) {
      setMode(data.userPreferences.mode);
      enableBottomMenu(data.userPreferences.bottomMenu);
      setNavbarColor(data.userPreferences.navbarColor);
      setSettingsExist(true);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!squadLoading && gqlSquad) {
      setSquad(
        gqlSquad.players.nodes.filter((s) => !s.isBenched && s.squadPosition)
      );

      setReserve(
        gqlSquad.players.nodes.filter((s) => s.isBenched || !s.squadPosition)
      );
    }
  }, [gqlSquad, squadLoading]);

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
      <ErrorViewContext.Provider
        value={{
          errorCode,
          errorMessage,
          setErrorCode,
          setErrorMessage,
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
              setSquad,
              setReserve,
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

                    {/* <Route path="/" Component={AuthorizedArea}> */}
                    <Route path="/" Component={Home} />
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
                    {/* </Route> */}
                    <Route path="*" Component={NotFound} />
                  </Routes>
                  <BottomMenu />
                </BrowserRouter>
              </div>
            </ThemeProvider>
          </TacticsContext.Provider>
        </UserSettingsContext.Provider>
      </ErrorViewContext.Provider>
    </UserTokenContext.Provider>
  );
}

export default App;
