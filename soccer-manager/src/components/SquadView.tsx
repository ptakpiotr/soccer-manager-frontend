import { useContext, useEffect, useState } from "react";
import { IPlayerSquadInfo, ISquadFormationShape, PositionType } from "../Types";
import { Grid } from "@mui/material";
import FormationView from "./FormationView";
import { TacticsContext } from "../context";

interface IProps {
  squad: IPlayerSquadInfo[];
  formation: string;
}

function SquadView({ squad, formation }: IProps) {
  const [_, setSquadFormationShape] = useState<
    ISquadFormationShape | undefined
  >();

  const [goalkeeper, setGoalkeeper] = useState<IPlayerSquadInfo[]>();
  const [defenders, setDefenders] = useState<IPlayerSquadInfo[]>();
  const [midfielders, setMidfielders] = useState<IPlayerSquadInfo[]>();
  const [strikers, setStrikers] = useState<IPlayerSquadInfo[]>();

  useEffect(() => {
    const playersPerFormation = formation.split("-").map((p) => parseInt(p));
    const goalkeeper = squad?.filter((s) => s?.squadPosition === 1);

    const defenders = squad?.filter(
      (s) =>
        s.squadPosition! > 1 && s.squadPosition! <= playersPerFormation[0] + 1
    );
    const midfielders = squad?.filter(
      (s) =>
        s.squadPosition! > playersPerFormation[0] + 1 &&
        s.squadPosition! <= playersPerFormation[0] + playersPerFormation[1] + 1
    );
    const strikers = squad?.filter(
      (s) =>
        s.squadPosition! >
          playersPerFormation[0] + playersPerFormation[1] + 1 &&
        s.squadPosition! <=
          playersPerFormation[0] +
            playersPerFormation[1] +
            playersPerFormation[2] +
            1
    );

    setSquadFormationShape({
      defenders: playersPerFormation[0],
      midfielders: playersPerFormation[1],
      strikers: playersPerFormation[2],
    });

    setGoalkeeper(goalkeeper);
    setDefenders(defenders);
    setMidfielders(midfielders);
    setStrikers(strikers);
  }, [formation, squad]);

  return (
    <Grid container rowGap={"2rem"}>
      <FormationView
        positionType={PositionType.GOALKEEPER}
        playersInFormation={goalkeeper}
      />
      <FormationView
        positionType={PositionType.DEFENDER}
        playersInFormation={defenders}
      />
      <FormationView
        positionType={PositionType.MIDFIELDER}
        playersInFormation={midfielders}
      />
      <FormationView
        positionType={PositionType.STRIKER}
        playersInFormation={strikers}
      />
    </Grid>
  );
}

export default SquadView;
