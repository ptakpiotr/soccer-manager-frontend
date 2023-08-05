import { useContext } from "react";
import { TacticsContext } from "../context";
import { IPlayerSquadInfo } from "../Types";

function useSwapPlayers() {
  const { reserve, squad, setSquad, setReserve } = useContext(TacticsContext);

  return function (p1: IPlayerSquadInfo, p2: IPlayerSquadInfo) {
    if (setSquad && setReserve) {
      const playerFromSquad = squad?.find((r) => r.playerId === p1.playerId);

      if (playerFromSquad) {
        const playerFromSquadIndex = squad?.indexOf(playerFromSquad);

        const reservePlayer = reserve?.find((r) => r.playerId === p2.playerId);

        if (reservePlayer) {
          const reservePlayerIndex = reserve?.indexOf(reservePlayer);

          setReserve((r) => {
            const playerFromSquadCopy = { ...playerFromSquad };

            playerFromSquadCopy.isBenched = true;
            playerFromSquadCopy.isInSquad = false;
            playerFromSquadCopy.squadPosition = undefined;

            r[reservePlayerIndex!] = playerFromSquadCopy;

            return [...r];
          });

          setSquad((s) => {
            const reservePlayerCopy = { ...reservePlayer };

            reservePlayerCopy.isBenched = false;
            reservePlayerCopy.isInSquad = true;

            reservePlayerCopy.squadPosition = playerFromSquad.squadPosition;

            s[playerFromSquadIndex!] = reservePlayerCopy;

            return [...s];
          });
        }
      }
    }
  };
}

export default useSwapPlayers;
