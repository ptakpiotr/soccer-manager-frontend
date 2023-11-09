import { Button, Grid } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { MdDeleteForever, MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import AppDialog, { IProps as AppDialogProps } from "../misc/AppDialog";
import axios from "axios";
import { UserTokenContext } from "../../context";
import jwt_decode from "jwt-decode";
import { useErrorMessageManager } from "../../hooks/useErrorMessageManager";

type ActionButtons = Pick<AppDialogProps, "actions">;

const deleteUserUrl = import.meta.env.VITE_AUTH_BACKEND_URL;

function ManageAccountActionCenter() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { token, setToken } = useContext(UserTokenContext);

  const notify = useErrorMessageManager();

  const { mutateAsync } = useReactMutation({
    mutationKey: ["delete-single-user"],
    mutationFn: async (userEmail: string) => {
      try {
        await axios.delete(`${deleteUserUrl}?userEmail=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        notify("Unable to delete the user");
      }
    },
  });

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
    navigate("/changePassword");
  };

  const handleDeleteAccoutClick = () => {
    setOpenDialog(true);
  };

  const manageDialogOpenState = (state: boolean) => {
    setOpenDialog(state);
  };

  const handleAccountDeletionCall = async () => {
    if (token) {
      const decodedToken = jwt_decode(token) as Record<
        string,
        string | string[]
      >;
      await mutateAsync(decodedToken["UserName"] as string);
      if (setToken) {
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
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
