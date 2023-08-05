import { BiSolidTrafficCone } from "react-icons/bi";
import { ITrainingCalendarInfo, TrainingType } from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";

type IProps = ITrainingCalendarInfo & {
  day: number;
};

function TrainingEventView({ trainingType, day }: IProps) {
  return (
    <div>
      <Grid container flexDirection={"row"}>
        <Grid container>
          <Grid item flex={1}>
            {TrainingType[trainingType]}
          </Grid>
          <Grid item>
            <BiSolidTrafficCone
              color={Globals.functions.mapTrainingTypeToColor(trainingType)}
              size={"3rem"}
            />
          </Grid>
        </Grid>
        <Grid container>{day}</Grid>
      </Grid>
    </div>
  );
}

export default TrainingEventView;
