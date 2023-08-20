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
import { LoginType } from "../../Types";
import { loginSchema } from "../../Validation";
import { ValidationError } from "yup";
import ValidationErrorAlert from "../ValidationErrorAlert";
import { useNavigate } from "react-router-dom";

function LoginView() {
  const [loginData, setLoginData] = useState<Partial<LoginType>>({});
  const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>();

  const navigate = useNavigate();

  const enableLoginButton = () => {
    setIsLoginEnabled(true);
    setErrors([]);
  };

  const setLoginDataOnInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    registerTypeKey: keyof LoginType
  ) => {
    setLoginData((prev) => ({
      ...prev,
      [registerTypeKey]: e.target.value,
    }));
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDataOnInputChange(e, "email");
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDataOnInputChange(e, "password");
  };

  const handleLinkClick = (address: string) => {
    navigate(address);
  };

  const handleClick = async () => {
    try {
      const valid = await loginSchema.validate(loginData);
      //TODO: make call
    } catch (ex) {
      if (ex instanceof ValidationError) {
        setIsLoginEnabled(false);
        setErrors(ex.errors);
      }
    }
  };

  return (
    <Grid container flexDirection="column" rowGap="1rem" maxWidth="768px">
      <Typography variant="h6">Login</Typography>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <FilledInput
          type="email"
          value={loginData.email}
          onChange={onEmailChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <FilledInput
          type="password"
          value={loginData.password}
          onChange={onPasswordChange}
          required
        ></FilledInput>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleClick}
        disabled={!isLoginEnabled}
      >
        Login
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
          handleLinkClick("/forgot-password");
        }}
      >
        Forgot password
      </Link>
      {!isLoginEnabled && errors ? (
        <ValidationErrorAlert
          errors={errors}
          enableButton={enableLoginButton}
        />
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default LoginView;
