import { useContext, useEffect, useState } from "react";
import { IPlayerSquadInfo, ISquadFormationShape } from "../Types";
import { Grid } from "@mui/material";
import FormationView from "./FormationView";
import { TacticsContext } from "../context";

interface IProps {
  formation: string;
}

function SquadView({ formation }: IProps) {
  const [_, setSquadFormationShape] = useState<
    ISquadFormationShape | undefined
  >();
  const { squad } = useContext(TacticsContext);

  const [goalkeeper, setGoalkeeper] = useState<IPlayerSquadInfo[]>();
  const [defenders, setDefenders] = useState<IPlayerSquadInfo[]>();
  const [midfielders, setMidfielders] = useState<IPlayerSquadInfo[]>();
  const [strikers, setStrikers] = useState<IPlayerSquadInfo[]>();

  useEffect(() => {
    const playersPerFormation = formation.split("-").map((p) => parseInt(p));

    const goalkeeper = squad?.filter((s) => s?.squadPosition === 1);

    const defenders = squad?.filter(
      (s) => s.squadPosition! > 1 && s.squadPosition! <= playersPerFormation[0]
    );
    const midfielders = squad?.filter(
      (s) =>
        s.squadPosition! > playersPerFormation[0] &&
        s.squadPosition! <= playersPerFormation[0] + playersPerFormation[1]
    );
    const strikers = squad?.filter(
      (s) =>
        s.squadPosition! > playersPerFormation[0] + playersPerFormation[1] &&
        s.squadPosition! <=
          playersPerFormation[0] +
            playersPerFormation[1] +
            playersPerFormation[2]
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
      <FormationView playersInFormation={goalkeeper} />
      <FormationView playersInFormation={defenders} />
      <FormationView playersInFormation={midfielders} />
      <FormationView playersInFormation={strikers} />
    </Grid>
  );
}

export default SquadView;
