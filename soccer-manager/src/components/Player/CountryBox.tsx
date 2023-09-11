import { Grid } from "@mui/material";
import Flag from "react-world-flags";
import "./country_code_box.scss";

interface IProps {
  countryCode: string;
}

function CountryBox({ countryCode }: IProps) {
  return (
    <Grid
      item
      flexDirection="row"
      columnGap="0.25rem"
      container
    >
      <Flag code={countryCode} width={50} />
      <div className="country-code-box">{countryCode}</div>
    </Grid>
  );
}

export default CountryBox;
