import ManageAccountActionCenter from "./ManageAccountActionCenter";
import { Typography } from "@mui/material";
import "./_manageAccount.scss";

function ManageAccountView() {
  return (
    <>
      <div className="manage-account-action-center">
        <Typography variant="h6">Manage your account settings</Typography>
        <ManageAccountActionCenter />
      </div>
    </>
  );
}

export default ManageAccountView;
