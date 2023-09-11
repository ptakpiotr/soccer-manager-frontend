import PlayerView from "../components/Player/PlayerView";
import { useParams } from "react-router-dom";

function Player() {
  const { id } = useParams();

  return <main>{id ? <PlayerView id={id} /> : <></>}</main>;
}

export default Player;
