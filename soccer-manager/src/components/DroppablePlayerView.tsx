import { useDrag, useDrop } from "react-dnd";
import FormationPlayerView from "./FormationPlayerView";
import { IPlayerSquadInfo } from "../Types";
import useSwapPlayers from "../hooks/useSwapPlayers";

function DroppablePlayerView(props: IPlayerSquadInfo) {
  const swapPlayers = useSwapPlayers();

  const [_, dragRef] = useDrag({
    type: "player",
    item: props,
  });

  const [__, dropRef] = useDrop<IPlayerSquadInfo>({
    accept: "player",
    drop(item, _) {
      swapPlayers(props, item);
    },
  });
  return (
    <div ref={dragRef}>
      <div ref={dropRef}>
        <FormationPlayerView id="123" {...props} />
      </div>
    </div>
  );
}

export default DroppablePlayerView;
