import { useParams } from "react-router-dom";
import MatchCentreView from "../components/MatchCentre/MatchCentreView";

function MatchCentre() {
  const {} = useParams();
  return (
    <main>
      <MatchCentreView isMyTeamHome={false} homeScore={10} awayScore={10} />
    </main>
  );
}

export default MatchCentre;
