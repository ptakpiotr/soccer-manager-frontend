import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useErrorMessageManager } from "../hooks/useErrorMessageManager";
import ErrorView from "../components/misc/ErrorView";
import { guidSchema } from "../Validation";
import MatchCentreWrapper from "../components/MatchCentre/MatchCentreWrapper";

function MatchCentre() {
  const { id } = useParams();
  const [isValid, setIsValid] = useState<boolean>(false);

  const { setErrorMessage } = useErrorMessageManager();

  useEffect(() => {
    if (!guidSchema.isValidSync({ teamId: id })) {
      if (setErrorMessage) {
        setErrorMessage("Given match doesn't exist");
      }
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [id]);

  return (
    <main>
      {!isValid || !id ? <ErrorView /> : <MatchCentreWrapper matchId={id} />}
    </main>
  );
}

export default MatchCentre;
