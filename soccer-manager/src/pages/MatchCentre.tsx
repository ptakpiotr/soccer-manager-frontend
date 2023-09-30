import { useParams } from "react-router-dom";
import MatchCentreView from "../components/MatchCentre/MatchCentreView";
import { useEffect } from "react";
import { useErrorMessageManager } from "../hooks/useErrorMessageManager";
import ErrorView from "../components/misc/ErrorView";

function MatchCentre() {
  const { id } = useParams();
  //TODO: fix it (from string to number)
  const { setErrorMessage } = useErrorMessageManager();
  useEffect(() => {
    if (typeof id !== "string") {
      if (setErrorMessage) {
        setErrorMessage("Given match doesn't exist");
      }
    }
  }, [id]);
  // make to call to retrieve match info
  return (
    <main>
      {typeof id !== "string" ? (
        <ErrorView />
      ) : (
        <MatchCentreView
          homeTeamId={parseInt(id)}
          awayTeamId={parseInt(id)}
          isMyTeamHome={false}
          homeScore={10}
          awayScore={10}
        />
      )}
    </main>
  );
}

export default MatchCentre;
