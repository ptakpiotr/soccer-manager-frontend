import { Button, Grid, Typography } from "@mui/material";
import { MdDeleteForever, MdBlock, MdDone } from "react-icons/md";
import { IUserAdminInfo } from "../../Types";
interface IProps extends IUserAdminInfo {
  deleteUser: (email: string) => void;
  blockUser: (email: string) => void;
  unBlockUser: (email: string) => void;
}

function AdminPanelUser({
  email,
  lockoutEnabled,
  deleteUser,
  blockUser,
  unBlockUser,
}: IProps) {
  return (
    <Grid container flexDirection="row" columnGap="0.5rem">
      <Grid item minWidth="12rem">
        <Typography>{email}</Typography>
      </Grid>
      <Grid item>
        <Button
          startIcon={<MdDeleteForever />}
          color="error"
          onClick={() => {
            deleteUser(email);
          }}
        ></Button>
        {lockoutEnabled ? (
          <Button
            startIcon={<MdDone />}
            onClick={() => {
              unBlockUser(email);
            }}
          ></Button>
        ) : (
          <Button
            startIcon={<MdBlock />}
            color="warning"
            onClick={() => {
              blockUser(email);
            }}
          ></Button>
        )}
      </Grid>
    </Grid>
  );
}

export default AdminPanelUser;
