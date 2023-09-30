import { Alert } from "@mui/material";
import { MdShield } from "react-icons/md";

function ProtectedAreaView() {
  return (
    <Alert color="info" icon={<MdShield />}>
      You don't have access to this area
    </Alert>
  );
}

export default ProtectedAreaView;
