import { BiSolidTrafficCone } from "react-icons/bi";
import { ITrainingCalendarInfo, TrainingType } from "../../Types";
import Globals from "../../Globals";
import { Grid } from "@mui/material";

type IProps = ITrainingCalendarInfo;

function TrainingEventView({ trainingType }: IProps) {
  return (
    <div>
      <Grid container flexDirection={"row"}>
        <Grid container>{TrainingType[trainingType]}</Grid>
        <Grid container>
          <Grid item flex={1}></Grid>
          <Grid item>
            <BiSolidTrafficCone
              color={Globals.functions.mapTrainingTypeToColor(trainingType)}
              size={"3rem"}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrainingEventView;
