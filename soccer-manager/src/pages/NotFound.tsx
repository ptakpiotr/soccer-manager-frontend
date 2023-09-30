import { useEffect } from "react";
import { useErrorMessageManager } from "../hooks/useErrorMessageManager";
import ErrorView from "../components/misc/ErrorView";

function NotFound() {
  const { setErrorMessage } = useErrorMessageManager();

  useEffect(() => {
    if (setErrorMessage) {
      setErrorMessage("Not found");
    }
  }, []);

  return (
    <main>
      <ErrorView />
    </main>
  );
}

export default NotFound;
