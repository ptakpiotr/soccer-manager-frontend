import { Grid, Typography } from "@mui/material";

interface IProps {
  day: number;
}

function NoCalendarData({ day }: IProps) {
  return (
    <Grid>
      <Grid flex={1} item className="calendar-day">
        {day}
      </Grid>
      <Grid item>
        <Typography>No event planned</Typography>
      </Grid>
    </Grid>
  );
}

export default NoCalendarData;
