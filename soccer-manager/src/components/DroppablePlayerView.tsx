import { useDrag, useDrop } from "react-dnd";
import FormationPlayerView from "./FormationPlayerView";
import { IPlayerSquadInfo, PositionType } from "../Types";
import useSwapPlayers from "../hooks/useSwapPlayers";

interface IProps extends IPlayerSquadInfo {
  squadPositionType: PositionType;
}

function DroppablePlayerView(props: IProps) {
  const swapPlayers = useSwapPlayers(props.squadPositionType);

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
        <FormationPlayerView {...props} />
      </div>
    </div>
  );
}

export default DroppablePlayerView;
