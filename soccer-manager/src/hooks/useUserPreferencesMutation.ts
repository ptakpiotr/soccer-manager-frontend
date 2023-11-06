import { useContext } from "react";
import { UserSettingsContext } from "../context";
import { useMutation as useGQLMutation } from "@apollo/client";
import {
  ADD_USER_PREFERENCES,
  EDIT_USER_PREFERENCES,
} from "../GraphQL/Mutations/settingsMutations";
import { GET_USER_PREFERENCES } from "../GraphQL/Queries/settingsQueries";

export function useUserPreferencesMutation() {
  const { settingsExists } = useContext(UserSettingsContext);

  const [mutateEdit, { data: editData }] = useGQLMutation(
    EDIT_USER_PREFERENCES,
    {
      refetchQueries: [GET_USER_PREFERENCES],
    }
  );

  const [mutateAdd, { data: addData }] = useGQLMutation(ADD_USER_PREFERENCES, {
    refetchQueries: [GET_USER_PREFERENCES],
  });

  if (settingsExists) {
    return {
      mutate: mutateEdit,
      data: editData,
    };
  }

  return {
    mutate: mutateAdd,
    data: addData,
  };
}
