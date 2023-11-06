import { useMemo } from "react";
import { IFinanceProfits, IFinanceSpendings } from "../../Types";
import AppPaper from "../AppPaper";
import FinancePerformance from "../Team/FinancePerformance";
import { Grid, List, ListItem, ListSubheader, Typography } from "@mui/material";

interface IProps {
  teamProfits: IFinanceProfits;
  teamSpendings: IFinanceSpendings;
}

function BudgetView({ teamProfits, teamSpendings }: IProps) {
  const sortedTeamProfits = useMemo(() => {
    let newArr = [...teamProfits.teamProfits];
    newArr.sort((t) => -t.season);

    return newArr;
  }, [teamProfits]);

  const sortedTeamSpendings = useMemo(() => {
    let newArr = [...teamSpendings.teamSpendings];
    newArr.sort((t) => -t.season);

    return newArr;
  }, [teamSpendings]);

  const currencyFormat = useMemo(
    () =>
      new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }),
    []
  );
  return (
    <Grid container>
      <Grid item flex={8}>
        <AppPaper>
          <FinancePerformance
            teamProfits={teamProfits}
            teamSpendings={teamSpendings}
          />
        </AppPaper>
      </Grid>
      <Grid item flex={4}>
        <AppPaper>
          <Typography padding="1rem">Summary this season</Typography>

          <List
            sx={{
              color: "tomato",
            }}
          >
            <ListSubheader>Spendings</ListSubheader>
            <ListItem>
              Transfers:{" "}
              {currencyFormat.format(sortedTeamSpendings[0].transfers)}
            </ListItem>
            <ListItem>
              Salaries: {currencyFormat.format(sortedTeamSpendings[0].salaries)}
            </ListItem>
          </List>
          <List
            sx={{
              color: "yellowgreen",
            }}
          >
            <ListSubheader>Profit</ListSubheader>
            <ListItem>
              Transfers: {currencyFormat.format(sortedTeamProfits[0].transfers)}
            </ListItem>
            <ListItem>
              Stadium: {currencyFormat.format(sortedTeamProfits[0].stadium)}
            </ListItem>
          </List>
        </AppPaper>
      </Grid>
    </Grid>
  );
}

export default BudgetView;
