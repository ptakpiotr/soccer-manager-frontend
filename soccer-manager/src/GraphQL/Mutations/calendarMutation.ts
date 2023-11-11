import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation AddEvent($input: AddCalendarEventInput!) {
    addCalendarEvent(input: $input) {
      teamId
      errorMessage
    }
  }
`;
