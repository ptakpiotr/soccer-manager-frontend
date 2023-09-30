import { Alert } from "@mui/material";
import { useContext } from "react";
import { ErrorViewContext } from "../../context";

function ErrorView() {
  const { errorMessage, errorCode } = useContext(ErrorViewContext);
  return (
    <main>
      <Alert variant="standard" color="error">
        {errorCode ? (
          <>
            <strong>{errorCode}</strong> |
          </>
        ) : (
          <></>
        )}
        {errorMessage}
      </Alert>
    </main>
  );
}

export default ErrorView;
