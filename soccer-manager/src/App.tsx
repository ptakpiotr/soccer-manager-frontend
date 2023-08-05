import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Tactics from "./pages/Tactics";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import { TacticsContext, UserSettingsContext } from "./context";
import Settings from "./pages/Settings";
import { IPlayerSquadInfo, PositionType } from "./Types";
import BottomMenu from "./components/BottomMenu";
import Calendar from "./pages/Calendar";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [bottomMenu, enableBottomMenu] = useState<boolean>(false);

  const playerSquadInfoList: IPlayerSquadInfo[] = [
    {
      playerId: "player123",
      playerName: "John Doe",
      playerRating: { rating: 5 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player123",
      isBenched: true,
      isInSquad: false,
      squadPosition: undefined,
      condition: 78,
      number: 8,
    },
    {
      playerId: "player7298",
      playerName: "Fabio Martinelli",
      playerRating: { rating: 6 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player7298",
      isBenched: false,
      isInSquad: true,
      squadPosition: 4,
      condition: 78,
      number: 8,
    },
    {
      playerId: "player729",
      playerName: "Johnny Sanchez",
      playerRating: { rating: 6 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player729",
      isBenched: false,
      isInSquad: true,
      squadPosition: 6,
      condition: 22,
      number: 8,
    },
    {
      playerId: "player456",
      playerName: "Jane Smith",
      playerRating: { rating: 4 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player456",
      isInSquad: true,
      isBenched: false,
      squadPosition: 3,
      condition: 78,
      number: 3,
    },
    {
      playerId: "player789",
      playerName: "Michael Johnson",
      playerRating: { rating: 3 },
      positionType: PositionType.STRIKER,
      image: "https://robohash.org/player789",
      isBenched: false,
      isInSquad: true,
      condition: 78,
      squadPosition: 9,
      number: 10,
    },
    {
      playerId: "player101",
      playerName: "Emily Williams",
      playerRating: { rating: 5 },
      positionType: PositionType.GOALKEEPER,
      image: "https://robohash.org/player101",
      isInSquad: true,
      condition: 78,
      isBenched: false,
      squadPosition: 1,
      number: 1,
    },
    {
      playerId: "player202",
      playerName: "David Brown",
      playerRating: { rating: 4 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player202",
      isInSquad: false,
      condition: 11,
      isBenched: true,
      number: 7,
    },
    {
      playerId: "player303",
      playerName: "Sarah Johnson",
      playerRating: { rating: 3 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player303",
      isInSquad: true,
      isBenched: false,
      condition: 2,
      number: 22,
    },
    {
      playerId: "player3033",
      playerName: "Sarah Johnson 2",
      playerRating: { rating: 3 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player3033",
      isInSquad: true,
      isBenched: false,
      squadPosition: 3,
      condition: 99,
      number: 22,
    },
    {
      playerId: "player404",
      playerName: "James Smith",
      playerRating: { rating: 5 },
      positionType: PositionType.STRIKER,
      image: "https://robohash.org/player404",
      isInSquad: false,
      condition: 51,
      isBenched: true,
      number: 9,
    },
    {
      playerId: "player505",
      playerName: "Olivia Davis",
      playerRating: { rating: 4 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player505",
      isInSquad: false,
      isBenched: true,
      number: 23,
      condition: 81,
    },
    {
      playerId: "player606",
      playerName: "William Anderson",
      playerRating: { rating: 3 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player606",
      isInSquad: false,
      isBenched: false,
      squadPosition: undefined,
      number: 17,
      condition: 81,
    },
    {
      playerId: "player707",
      playerName: "Sophia Martinez",
      playerRating: { rating: 5 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player707",
      isInSquad: true,
      isBenched: false,
      squadPosition: 7,
      number: 25,
      condition: 81,
    },
    {
      playerId: "player808",
      playerName: "Liam Jackson",
      playerRating: { rating: 4 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player808",
      isInSquad: true,
      isBenched: false,
      squadPosition: 8,
      condition: 81,
      number: 14,
    },
    {
      playerId: "player909",
      playerName: "Ava Taylor",
      playerRating: { rating: 3 },
      positionType: PositionType.STRIKER,
      image: "https://robohash.org/player909",
      isInSquad: false,
      isBenched: true,
      squadPosition: undefined,
      condition: 81,
      injuredTill: new Date(),
      suspended: true,
      number: 19,
    },
    {
      playerId: "player1010",
      playerName: "Noah White",
      playerRating: { rating: 5 },
      positionType: PositionType.DEFENDER,
      image: "https://robohash.org/player1010",
      isInSquad: true,
      isBenched: false,
      injuredTill: new Date(2025, 1, 1, 1, 0, 0),
      squadPosition: 5,
      number: 5,
      condition: 81,
    },
    {
      playerId: "player1111",
      playerName: "Isabella Garcia",
      playerRating: { rating: 4 },
      positionType: PositionType.MIDFIELDER,
      image: "https://robohash.org/player1111",
      isInSquad: false,
      isBenched: false,
      squadPosition: undefined,
      number: 21,
      condition: 81,
    },
    {
      playerId: "player1212",
      playerName: "Mason Rodriguez",
      playerRating: { rating: 3 },
      positionType: PositionType.STRIKER,
      image: "https://robohash.org/player1212",
      isInSquad: true,
      isBenched: false,
      squadPosition: 10,
      condition: 81,
      number: 30,
      yellowCard: true,
    },
    {
      playerId: "player1313",
      playerName: "Ella Moore",
      playerRating: { rating: 5 },
      positionType: PositionType.STRIKER,
      image: "https://robohash.org/player1313",
      isBenched: false,
      isInSquad: true,
      condition: 81,
      squadPosition: 11,
      number: 13,
      injuredTill: new Date(2024, 12, 1),
    },
  ];

  const [benchedPlayers, setBenchedPlayers] = useState<IPlayerSquadInfo[]>(
    playerSquadInfoList.filter((p) => p.isBenched === true)
  );

  const [squadPlayers, setSquadPlayers] = useState<IPlayerSquadInfo[]>(
    playerSquadInfoList.filter((p) => p.isInSquad === true)
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#228B22",
          },
          background: {
            default: "#ffffff",
          },
          mode,
        },
      }),
    [mode]
  );

  return (
    <UserSettingsContext.Provider
      value={{
        mode,
        setMode,
        bottomMenu,
        enableBottomMenu,
      }}
    >
      <TacticsContext.Provider
        value={{
          squad: squadPlayers,
          reserve: benchedPlayers,
          setSquad: setSquadPlayers,
          setReserve: setBenchedPlayers,
        }}
      >
        <ThemeProvider theme={theme}>
          <div className={mode === "light" ? "light-mode" : "dark-mode"}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/tactics" Component={Tactics} />
                <Route path="/calendar" Component={Calendar} />
                <Route path="/settings" Component={Settings} />
              </Routes>
              <BottomMenu />
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </TacticsContext.Provider>
    </UserSettingsContext.Provider>
  );
}

export default App;
