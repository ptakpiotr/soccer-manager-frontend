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
import { ChangePasswordType } from "../../Types";
import { changePasswordSchema } from "../../Validation";
import axios, { AxiosError } from "axios";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import { UserTokenContext } from "../../context";

const changePasswordUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/login`;

function ChangePasswordView() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const navigate = useNavigate();

  const { data, mutateAsync } = useReactMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: ChangePasswordType) => {
      try {
        const res = await axios.post(changePasswordUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmedPassword("");

        return res.data;
      } catch (ex) {
        if (ex instanceof AxiosError) {
          //TODO: error handling
          // setErrors(ex.response?.data?.map((d: any) => d.description));
        }
      }
    },
  });

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
    const valid = await changePasswordSchema.validate({
      currentPassword,
      newPassword,
      confirmedPassword,
    });

    await mutateAsync(valid);
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
