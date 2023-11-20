import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation AddEvent($input: AddCalendarEventInput!) {
    addCalendarEvent(input: $input) {
      teamId
      errorMessage
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation EditEvent($id: UUID!, $input: EditCalendarEventInput!) {
    editCalendarEvent(id: $id, input: $input) {
      teamId
      errorMessage
    }
  }
`;
