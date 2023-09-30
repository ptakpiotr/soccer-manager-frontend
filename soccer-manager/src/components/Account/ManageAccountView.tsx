import SoccerLogoDesigner from "../misc/SoccerLogoDesigner";
import SoccerKitDesinger from "../misc/SoccerKitDesinger";
import "./_manageAccount.scss";
import ManageAccountActionCenter from "./ManageAccountActionCenter";
import { Typography } from "@mui/material";

function ManageAccountView() {
  return (
    <>
      <Typography variant="h6">Manage your team settings</Typography>
      <div className="manage-account-container">
        <div className="soccer-logo-designer-container">
          <SoccerLogoDesigner />
        </div>
        <div className="soccer-kit-designer-container">
          <SoccerKitDesinger />
        </div>
        <div className="soccer-kit-designer-container">
          <SoccerKitDesinger />
        </div>
      </div>
      <div className="manage-account-action-center">
        <Typography variant="h6">Manage your account settings</Typography>
        <ManageAccountActionCenter />
      </div>
    </>
  );
}

export default ManageAccountView;
