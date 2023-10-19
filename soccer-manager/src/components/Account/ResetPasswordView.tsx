import { ChangeEvent, useContext, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  Typography,
  Grid,
  Button,
  Link,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { ResetPasswordType } from "../../Types";
import { resetPasswordSchema } from "../../Validation";
import axios, { AxiosError } from "axios";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import { UserTokenContext } from "../../context";

const resetPasswordUrl = `${
  import.meta.env.VITE_AUTH_BACKEND_URL
}/resetPassword`;

function ResetPasswordView() {
  //nie mozna uzyc useSearchParams -> usuwa znaki typu +
  const params = window.location.href.split("=");

  const token = params[1].replace("&email", "");
  const email = params[2];

  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const { setToken } = useContext(UserTokenContext);

  const navigate = useNavigate();

  const { mutateAsync } = useReactMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (data: ResetPasswordType) => {
      try {
        const res = await axios.post(resetPasswordUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setPassword("");
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

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };

  const handleLinkClick = (address: string) => {
    navigate(address);
  };

  const handleClick = async () => {
    const valid = await resetPasswordSchema.validate({
      email,
      token,
      password,
      confirmedPassword,
    });

    await mutateAsync(valid);

    if (setToken) {
      setToken("");
      localStorage.removeItem("token");
    }

    navigate("/login");
  };

  if (!email || !token) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container flexDirection="column" rowGap="1rem" maxWidth="768px">
      <Typography variant="h6">Reset password</Typography>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <FilledInput
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>Confirm password</InputLabel>
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
        Reset password
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

export default ResetPasswordView;
