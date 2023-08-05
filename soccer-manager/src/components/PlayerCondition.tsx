import { LinearProgress } from "@mui/material";

interface IProps {
  condition: number;
}

function PlayerCondition({ condition }: IProps) {
  const getColor = (condition: number) => {
    if (condition > 75) {
      return "success";
    } else if (condition > 50) {
      return "info";
    } else if (condition > 30) {
      return "warning";
    } else {
      return "error";
    }
  };
  return (
    <LinearProgress
      value={condition}
      variant="determinate"
      color={getColor(condition)}
    />
  );
}

export default PlayerCondition;
