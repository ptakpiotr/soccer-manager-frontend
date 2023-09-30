import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { RegisterType } from "../../Types";
// import { registerSchema } from "../../Validation";
import { ValidationError } from "yup";
import ValidationErrorAlert from "../ValidationErrorAlert";

//TODO: hiding nice when all valid
function RegisterView() {
  const [registerData, setRegisterData] = useState<Partial<RegisterType>>({});
  const [isRegisterEnabled, setIsRegisterEnabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>();
  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  const enableRegisterButton = () => {
    setIsRegisterEnabled(true);
    setErrors([]);
  };

  const setRegisterDataOnInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    registerTypeKey: keyof RegisterType
  ) => {
    setRegisterData((prev) => ({
      ...prev,
      [registerTypeKey]: e.target.value,
    }));
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterDataOnInputChange(e, "email");
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterDataOnInputChange(e, "password");
  };

  const onConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterDataOnInputChange(e, "confirmedPassword");
  };

  const handleClick = async () => {
    try {
      // const valid = await registerSchema.validate(registerData);
      setIsAllValid(true);
      //TODO: make call
    } catch (ex) {
      if (ex instanceof ValidationError) {
        setIsRegisterEnabled(false);
        setErrors(ex.errors);
      }
    }
  };

  return (
    <Grid
      container
      flexDirection="column"
      rowGap="1rem"
      maxWidth="768px"
      className={isAllValid ? "valid-registration" : ""}
    >
      <Typography variant="h6">Register</Typography>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <FilledInput
          type="email"
          value={registerData.email}
          onChange={onEmailChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <FilledInput
          type="password"
          value={registerData.password}
          onChange={onPasswordChange}
          required
        ></FilledInput>
      </FormControl>
      <FormControl>
        <InputLabel>Confirm password</InputLabel>
        <FilledInput
          type="password"
          value={registerData.confirmedPassword}
          onChange={onConfirmedPasswordChange}
          required
        ></FilledInput>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={!isRegisterEnabled}
      >
        Register
      </Button>
      {!isRegisterEnabled && errors ? (
        <ValidationErrorAlert
          errors={errors}
          enableButton={enableRegisterButton}
        />
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default RegisterView;
