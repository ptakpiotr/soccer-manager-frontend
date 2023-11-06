import {
  ADD_STADIUM,
  EDIT_STADIUM,
} from "../GraphQL/Mutations/facilitiesMutation";
import { GET_FACILITY } from "../GraphQL/Queries/facilityQueries";
import { IStadiumSettings } from "../Types";
import { useMutation as useGQLMutation } from "@apollo/client";

export function useStadiumMutation(stadium?: IStadiumSettings) {
  const [mutateEdit, { data: editData }] = useGQLMutation(EDIT_STADIUM, {
    refetchQueries: [GET_FACILITY],
  });

  const [mutateAdd, { data: addData }] = useGQLMutation(ADD_STADIUM, {
    refetchQueries: [GET_FACILITY],
  });

  if (stadium) {
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
