import { useContext } from "react";
import {
  GET_TEAM_PROFITS,
  GET_TEAM_SPENDINGS,
} from "../GraphQL/Queries/budgetQueries";
import { IFinanceProfits, IFinanceSpendings } from "../Types";
import BudgetView from "../components/Budget/BudgetView";
import { useQuery as useGQLQuery } from "@apollo/client";
import { UserTokenContext } from "../context";
import Loading from "../components/misc/Loading";

function Budget() {
  const { teamId } = useContext(UserTokenContext);

  const teamProfits = useGQLQuery<IFinanceProfits>(GET_TEAM_PROFITS, {
    pollInterval: 3600000 * 12,
    variables: {
      teamId,
    },
  });

  const teamSpendings = useGQLQuery<IFinanceSpendings>(GET_TEAM_SPENDINGS, {
    pollInterval: 3600000 * 12,
    variables: {
      teamId,
    },
  });

  return (
    <main>
      {teamSpendings.data && teamProfits.data ? (
        <BudgetView
          teamProfits={teamProfits.data!}
          teamSpendings={teamSpendings.data!}
        />
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Budget;
