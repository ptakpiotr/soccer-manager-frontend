import { Alert, Grid } from "@mui/material";
import { useState } from "react";

interface IProps {
  messages: string[];
}

function InfoAlert({ messages }: IProps) {
  const [numberOfNotClosed, setNumberOfNotClosed] = useState<number>(
    messages.length
  );

  return (
    <Grid flexDirection="column" rowGap="0.5rem">
      {messages.map(
        (m, i) =>
          numberOfNotClosed > i && (
            <Alert
              variant="filled"
              severity="info"
              key={m}
              onClose={() => {
                setNumberOfNotClosed((prev) => prev - 1);
              }}
            >
              {m}
            </Alert>
          )
      )}
    </Grid>
  );
}

export default InfoAlert;
