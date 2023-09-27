import { useParams } from "react-router-dom";
import MatchCentreView from "../components/MatchCentre/MatchCentreView";

function MatchCentre() {
  const { id } = useParams();
  return (
    <main>
      <MatchCentreView />
    </main>
  );
}

export default MatchCentre;
