import {
  ADD_ACADEMY,
  EDIT_ACADEMY,
} from "../GraphQL/Mutations/facilitiesMutation";
import { GET_FACILITY } from "../GraphQL/Queries/facilityQueries";
import { IAcademySettings } from "../Types";
import { useMutation as useGQLMutation } from "@apollo/client";

export function useAcademyFacilityMutation(academy?: IAcademySettings) {
  const [mutateEdit, { data: editData }] = useGQLMutation(EDIT_ACADEMY, {
    refetchQueries: [GET_FACILITY],
  });

  const [mutateAdd, { data: addData }] = useGQLMutation(ADD_ACADEMY, {
    refetchQueries: [GET_FACILITY],
  });

  if (academy) {
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
