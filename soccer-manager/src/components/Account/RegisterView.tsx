import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import { RegisterType } from "../../Types";
import { registerSchema } from "../../Validation";
import { ValidationError } from "yup";
import ValidationErrorAlert from "../ValidationErrorAlert";

const registerUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/register`;

//TODO: hiding nice when all valid
function RegisterView() {
  const [registerData, setRegisterData] = useState<Partial<RegisterType>>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegisterEnabled, setIsRegisterEnabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  const { mutateAsync } = useReactMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => {
      try {
        const res = await axios.post(registerUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        //TODO: add entry in the data api
        setRegisterData({ email: "", password: "", confirmPassword: "" });
        return res.data;
      } catch (ex) {
        if (ex instanceof AxiosError) {
          setIsRegisterEnabled(false);

          setErrors(ex.response?.data);
        }
      }
    },
  });

  const enableRegisterButton = () => {
    setIsRegisterEnabled(true);
    setErrors("");
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
    setRegisterDataOnInputChange(e, "confirmPassword");
  };

  const handleClick = async () => {
    try {
      const valid = await registerSchema.validate(registerData);
      setIsAllValid(true);
      await mutateAsync(valid);
    } catch (ex) {
      if (ex instanceof ValidationError) {
        setIsRegisterEnabled(false);
        setErrors(ex.errors.join(","));
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
          value={registerData.confirmPassword}
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
