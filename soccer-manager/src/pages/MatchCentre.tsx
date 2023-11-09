import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useErrorMessageManager } from "../hooks/useErrorMessageManager";
import { guidSchema } from "../Validation";
import MatchCentreWrapper from "../components/MatchCentre/MatchCentreWrapper";

function MatchCentre() {
  const { id } = useParams();
  const [isValid, setIsValid] = useState<boolean>(false);
  const notify = useErrorMessageManager();

  useEffect(() => {
    if (!guidSchema.isValidSync({ teamId: id })) {
      notify("Given match doesn't exist", "error");
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [id]);

  return <main>{isValid && id && <MatchCentreWrapper matchId={id} />}</main>;
}

export default MatchCentre;
