import { useContext } from "react";
import { UserSettingsContext } from "../context";
import { useMutation as useGQLMutation } from "@apollo/client";
import {
  ADD_USER_PREFERENCES,
  EDIT_USER_PREFERENCES,
} from "../GraphQL/Mutations/settingsMutations";
import { GET_USER_PREFERENCES } from "../GraphQL/Queries/settingsQueries";
import { IGeneralPayload } from "../Types";

export function useUserPreferencesMutation() {
  const { settingsExists } = useContext(UserSettingsContext);

  const [mutateEdit, { data: editData, error: editError }] = useGQLMutation<{
    editUserPreferences: IGeneralPayload;
  }>(EDIT_USER_PREFERENCES, {
    refetchQueries: [GET_USER_PREFERENCES],
  });

  const [mutateAdd, { data: addData, error: addError }] = useGQLMutation<{
    addUserPreferences: IGeneralPayload;
  }>(ADD_USER_PREFERENCES, {
    refetchQueries: [GET_USER_PREFERENCES],
  });

  if (settingsExists) {
    return {
      mutate: mutateEdit,
      data: editData,
      error: editError,
    };
  }

  return {
    mutate: mutateAdd,
    data: addData,
    error: addError,
  };
}
