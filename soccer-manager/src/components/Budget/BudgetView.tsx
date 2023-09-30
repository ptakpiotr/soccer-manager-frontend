import AppPaper from "../AppPaper";
import FinancePerformance from "../Team/FinancePerformance";
import { Grid, List, ListItem, ListSubheader, Typography } from "@mui/material";

function BudgetView() {
  return (
    <Grid container>
      <Grid item flex={8}>
        <AppPaper>
          <FinancePerformance
            monthlyPerformance={[
              {
                money: 1,
                month: 1,
              },
            ]}
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
            <ListItem>Transfers:</ListItem>
            <ListItem>Salaries:</ListItem>
          </List>
          <List
            sx={{
              color: "yellowgreen",
            }}
          >
            <ListSubheader>Profit</ListSubheader>
            <ListItem>Transfers:</ListItem>
            <ListItem>Stadium:</ListItem>
          </List>
        </AppPaper>
      </Grid>
    </Grid>
  );
}

export default BudgetView;
