import { Alert } from "@mui/material";
import { MdHourglassEmpty } from "react-icons/md";

function NoData() {
  return (
    <Alert color="info" icon={<MdHourglassEmpty />}>
      No data matching chosen filtering criteria or empty set
    </Alert>
  );
}

export default NoData;
