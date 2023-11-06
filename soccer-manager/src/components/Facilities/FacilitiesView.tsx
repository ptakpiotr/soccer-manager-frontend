import { Grid } from "@mui/material";
import StadiumFacility from "./StadiumFacility";
import AcademyFacility from "./AcademyFacility";
import { IAcademySettings, IStadiumSettings } from "../../Types";

interface IProps {
  academy?: IAcademySettings;
  stadium?: IStadiumSettings;
}

function FacilitiesView({ academy, stadium }: IProps) {
  return (
    <Grid container flexDirection="row">
      <StadiumFacility stadium={stadium} />
      <AcademyFacility academy={academy} />
    </Grid>
  );
}

export default FacilitiesView;
