import { useContext } from "react";
import { ErrorViewContext } from "../context";

export function useErrorMessageManager() {
  const { setErrorMessage, setErrorCode } = useContext(ErrorViewContext);

  return { setErrorMessage, setErrorCode };
}
