import { IPlayerSquadInfo } from "../Types";
import { useDrag, useDrop } from "react-dnd";
import TacticsPlayerView from "./TacticsPlayerView";
import useSwapPlayers from "../hooks/useSwapPlayers";

function DraggablePlayerView(props: IPlayerSquadInfo) {
  const swapPlayers = useSwapPlayers();

  const [_, dragRef] = useDrag({
    type: "player",
    item: props,
  });

  const [__, dropRef] = useDrop<IPlayerSquadInfo>({
    accept: "player",
    drop(item, _) {
      swapPlayers(item, props);
    },
  });

  if (props.suspended || props.injuredTill) {
    return (
      <div className="disabled-player-view">
        <div>
          <TacticsPlayerView {...props} />
        </div>
      </div>
    );
  } else {
    return (
      <div ref={dragRef}>
        <div ref={dropRef}>
          <TacticsPlayerView {...props} />
        </div>
      </div>
    );
  }
}

export default DraggablePlayerView;
