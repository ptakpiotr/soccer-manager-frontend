import { Grid } from "@mui/material";
import StadiumFacility from "./StadiumFacility";
import AcademyFacility from "./AcademyFacility";

function FacilitiesView() {
  return (
    <Grid container flexDirection="row">
      <StadiumFacility />
      <AcademyFacility />
    </Grid>
  );
}

export default FacilitiesView;
