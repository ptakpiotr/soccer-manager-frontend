import { Button, Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { MdDeleteForever, MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppDialog, { IProps as AppDialogProps } from "../misc/AppDialog";

type ActionButtons = Pick<AppDialogProps, "actions">;

function ManageAccountActionCenter() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const actionButtons = useMemo((): ActionButtons => {
    return {
      actions: [
        {
          text: "ok",
          action: () => {
            handleAccountDeletionCall();
            setOpenDialog(false);
          },
        },
        {
          text: "dismiss",
          action: () => {
            setOpenDialog(false);
          },
        },
      ],
    };
  }, []);

  const navigate = useNavigate();

  const handleChangePasswordClick = () => {
    navigate("/change-password");
  };

  const handleDeleteAccoutClick = () => {
    setOpenDialog(true);
    // TODO: implement API call
  };

  const manageDialogOpenState = (state: boolean) => {
    setOpenDialog(state);
  };

  const handleAccountDeletionCall = () => {
    console.log("Deleting account...");
    // TODO: implement API call
  };

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      columnGap="1rem"
    >
      <AppDialog
        isOpen={openDialog}
        setIsOpen={manageDialogOpenState}
        dialogTitle="Are you sure?"
        actions={actionButtons.actions}
      ></AppDialog>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<MdDeleteForever />}
          color="error"
          onClick={handleDeleteAccoutClick}
        >
          Delete account
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<MdPassword />}
          color="warning"
          onClick={handleChangePasswordClick}
        >
          Change password
        </Button>
      </Grid>
    </Grid>
  );
}

export default ManageAccountActionCenter;
