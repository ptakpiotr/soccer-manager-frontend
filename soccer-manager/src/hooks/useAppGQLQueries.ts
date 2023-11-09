import { useQuery as useGQLQuery } from "@apollo/client";
import {
  IPlayerSquadInfo,
  ITacticsSetters,
  IUserSettings,
  IUserSettingsSetters,
} from "../Types";
import { GET_USER_PREFERENCES } from "../GraphQL/Queries/settingsQueries";
import { GET_TACTICS_PLAYERS } from "../GraphQL/Queries/playerQueries";
import { useEffect } from "react";

interface IAppGQLQueriesParams extends IUserSettingsSetters, ITacticsSetters {
  userId: string;
  teamId: string;
}

export function useAppGQLQueries({
  enableBottomMenu,
  setFormation,
  setMode,
  setNavbarColor,
  setReserve,
  setSettingsExist,
  setSquad,
  teamId,
  userId,
}: IAppGQLQueriesParams) {
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
      const gqlFormation = gqlSquad.players.nodes[0].team?.formation;

      if (gqlFormation) {
        setFormation(gqlFormation);
      } else {
        setFormation("4-3-3");
      }
    }
  }, [gqlSquad, squadLoading]);
}
