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
import { BiSad } from "react-icons/bi";

function ForgotPasswordView() {
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLinkClick = (address: string) => {
    navigate(address);
  };

  const handleClick = async () => {
    //TODO: make call
  };

  return (
    <Grid container flexDirection="column" rowGap="1rem" maxWidth="768px">
      <Typography variant="h6">Forgot password</Typography>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <FilledInput
          type="email"
          value={email}
          onChange={onEmailChange}
          required
        ></FilledInput>
      </FormControl>

      <Button variant="contained" onClick={handleClick} startIcon={<BiSad />}>
        Forgot password
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

export default ForgotPasswordView;
