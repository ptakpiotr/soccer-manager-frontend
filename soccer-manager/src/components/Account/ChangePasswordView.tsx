import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  Typography,
  Grid,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { changePasswordSchema } from "../../Validation";
function ChangePasswordView() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const navigate = useNavigate();

  const onCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };
  const onNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const onConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };

  const handleLinkClick = (address: string) => {
    navigate(address);
  };

  const handleClick = async () => {
    //TODO: make call
    changePasswordSchema.validate({
      currentPassword,
      newPassword,
      confirmedPassword,
    });
  };

  return (
    <Grid container flexDirection="column" rowGap="1rem" maxWidth="768px">
      <Typography variant="h6">Change password</Typography>
      <FormControl>
        <InputLabel>Current password</InputLabel>
        <FilledInput
          type="password"
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>New password</InputLabel>
        <FilledInput
          type="password"
          value={newPassword}
          onChange={onNewPasswordChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>Confirm new password</InputLabel>
        <FilledInput
          type="password"
          value={confirmedPassword}
          onChange={onConfirmedPasswordChange}
          required
        ></FilledInput>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<MdPassword />}
      >
        Change password
      </Button>
      <Link
        onClick={() => {
          handleLinkClick("/register");
        }}
      >
        Click here to register
      </Link>
      <Link
        onClick={() => {
          handleLinkClick("/login");
        }}
      >
        Click here to login
      </Link>
    </Grid>
  );
}

export default ChangePasswordView;
