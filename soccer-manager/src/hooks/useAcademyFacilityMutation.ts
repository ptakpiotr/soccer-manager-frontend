import {
  ADD_ACADEMY,
  EDIT_ACADEMY,
} from "../GraphQL/Mutations/facilitiesMutation";
import { GET_FACILITY } from "../GraphQL/Queries/facilityQueries";
import { IAcademySettings, IGeneralPayload } from "../Types";
import { useMutation as useGQLMutation } from "@apollo/client";

export function useAcademyFacilityMutation(academy?: IAcademySettings) {
  const [mutateEdit, { data: editData, error: editError }] = useGQLMutation<{
    editAcademyFacility: IGeneralPayload;
  }>(EDIT_ACADEMY, {
    refetchQueries: [GET_FACILITY],
  });

  const [mutateAdd, { data: addData, error: addError }] = useGQLMutation<{
    addAcademyFacility: IGeneralPayload;
  }>(ADD_ACADEMY, {
    refetchQueries: [GET_FACILITY],
  });

  if (academy) {
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
