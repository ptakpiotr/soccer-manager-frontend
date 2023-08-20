import { Alert, Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  errors: string[];
  enableButton: ()=>void;
}

function ValidationErrorAlert({ errors, enableButton }: IProps) {
  const [numberOfNotClosed, setNumberOfNotClosed] = useState<number>(
    errors.length
  );

  useEffect(() => {
    if (numberOfNotClosed <= 0) {
      enableButton();
    }
  }, [numberOfNotClosed]);

  return (
    <Grid flexDirection="column" rowGap="0.5rem">
      {errors.map((e) => (
        <Alert
          variant="filled"
          severity="error"
          key={e}
          onClose={() => {
            setNumberOfNotClosed((prev) => prev - 1);
          }}
        >
          {e}
        </Alert>
      ))}
    </Grid>
  );
}

export default ValidationErrorAlert;
