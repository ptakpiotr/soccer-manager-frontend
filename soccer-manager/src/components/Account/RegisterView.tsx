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
import { useMutation as useGQLMutation } from "@apollo/client";
import { ISoccerLogo, ISoccerShirt, RegisterType } from "../../Types";
import {
  registerSchema,
  soccerLogoSchema,
  soccerShirtSchema,
} from "../../Validation";
import { ValidationError } from "yup";
import ValidationErrorAlert from "../ValidationErrorAlert";
import { ADD_TEAM } from "../../GraphQL/Mutations/teamMutations";
import { useMessageManager } from "../../hooks/useMessageManager";
import { useNavigate } from "react-router-dom";

const registerUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/register`;

interface IProps {
  errors: string;
  isAllValid: boolean;
  setErrors: React.Dispatch<React.SetStateAction<string>>;
  setIsAllValid: React.Dispatch<React.SetStateAction<boolean>>;
  setups: {
    logoSetup: ISoccerLogo;
    firstKitSetup: ISoccerShirt;
    secondKitSetup: ISoccerShirt;
  };
}

function RegisterView({
  errors,
  isAllValid,
  setErrors,
  setIsAllValid,
  setups: { logoSetup, firstKitSetup, secondKitSetup },
}: IProps) {
  const [registerData, setRegisterData] = useState<Partial<RegisterType>>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isRegisterEnabled, setIsRegisterEnabled] = useState<boolean>(true);

  const [mutateData] = useGQLMutation(ADD_TEAM);

  const { mutateAsync } = useReactMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => {
      try {
        const res = await axios.post(registerUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data as { userId: string };
      } catch (ex) {
        if (ex instanceof AxiosError) {
          setIsRegisterEnabled(false);

          setErrors(ex.response?.data);
        }
      }
    },
  });

  const notify = useMessageManager();
  const navigate = useNavigate();

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
      const validLogo = await soccerLogoSchema.validate(logoSetup);
      const validFirstKit = await soccerShirtSchema.validate(firstKitSetup);
      const validSecondKit = await soccerShirtSchema.validate(secondKitSetup);
      const valid = await registerSchema.validate(registerData);

      setIsAllValid(true);

      const returnData = await mutateAsync(valid);

      if (returnData) {
        await mutateData({
          variables: {
            userId: returnData.userId,
            firstMainColor: validFirstKit.mainColor,
            firstSecondaryColor: validFirstKit.secondaryColor,
            firstType: validFirstKit.type,
            iconId: validLogo.iconId,
            logoMainColor: validLogo.mainColor,
            logoSecondaryColor: validLogo.secondaryColor,
            logoType: validLogo.type,
            name: validLogo.name,
            secondMainColor: validSecondKit.mainColor,
            secondSecondaryColor: validSecondKit.secondaryColor,
            secondType: validSecondKit.type,
          },
        });

        setRegisterData({ email: "", password: "", confirmPassword: "" });
        notify("Succesfully registered", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
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
