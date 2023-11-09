import {
  ADD_STADIUM,
  EDIT_STADIUM,
} from "../GraphQL/Mutations/facilitiesMutation";
import { GET_FACILITY } from "../GraphQL/Queries/facilityQueries";
import { IGeneralPayload, IStadiumSettings } from "../Types";
import { useMutation as useGQLMutation } from "@apollo/client";

export function useStadiumMutation(stadium?: IStadiumSettings) {
  const [mutateEdit, { data: editData, error: editError }] = useGQLMutation<{
    editStadium: IGeneralPayload;
  }>(EDIT_STADIUM, {
    refetchQueries: [GET_FACILITY],
  });

  const [mutateAdd, { data: addData, error: addError }] = useGQLMutation<{
    addStadium: IGeneralPayload;
  }>(ADD_STADIUM, {
    refetchQueries: [GET_FACILITY],
  });

  if (stadium) {
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
