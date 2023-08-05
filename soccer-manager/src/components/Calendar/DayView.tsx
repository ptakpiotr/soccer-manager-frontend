import { Card, Grid, ButtonBase, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import TrainingEventView from "./TrainingEventView";
import { TrainingType } from "../../Types";

interface IProps {
  day: number;
}

function DayView({ day }: IProps) {
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date();

    if (day < today.getUTCDay()) {
      setIsActive(false);
    }
  }, [day]);

  return (
    <Grid item>
      <ButtonBase disableRipple={!isActive}>
        <Card
          sx={{
            width: "200px",
            height: "200px",
          }}
          variant="outlined"
        >
          <CardContent>
            <TrainingEventView
              trainingType={TrainingType.GOALKEEPER}
              day={day}
            />
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}

export default DayView;
