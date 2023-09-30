import { Button, Grid, Typography } from "@mui/material";
import { MdDeleteForever, MdBlock, MdDone } from "react-icons/md";

interface IProps {
  userId: string;
  userEmail: string;
  deleteUser: (userId: string) => void;
  blockUser: (userId: string) => void;
  unBlockUser: (userId: string) => void;
}

function AdminPanelUser({
  userId,
  userEmail,
  deleteUser,
  blockUser,
  unBlockUser,
}: IProps) {
  return (
    <Grid container flexDirection="row" columnGap="0.5rem">
      <Grid item minWidth="12rem">
        <Typography>{userEmail}</Typography>
      </Grid>
      <Grid item>
        <Button
          startIcon={<MdDeleteForever />}
          color="error"
          onClick={() => {
            deleteUser(userId);
          }}
        ></Button>
        <Button
          startIcon={<MdBlock />}
          color="warning"
          onClick={() => {
            blockUser(userId);
          }}
        ></Button>
        <Button
          startIcon={<MdDone />}
          onClick={() => {
            unBlockUser(userId);
          }}
        ></Button>
      </Grid>
    </Grid>
  );
}

export default AdminPanelUser;
