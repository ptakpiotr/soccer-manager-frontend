import React from "react";
import { GameResultType } from "../../Types";
import { Badge, Box } from "@mui/material";

interface IProps {
  results: GameResultType[];
}

function RecentForm({ results }: IProps) {
  const getBadgeColor = (result: GameResultType) => {
    switch (result) {
      case GameResultType.WIN:
        return "success";
      case GameResultType.DRAW:
        return "info";
      case GameResultType.LOST:
        return "error";
    }
  };
  return (
    <Box>
      {results.map((r) => (
        <Badge
          variant="dot"
          badgeContent=" "
          color={getBadgeColor(r)}
          component={"div"}
        >
          <div className="form-div"></div>
        </Badge>
      ))}
    </Box>
  );
}

export default RecentForm;
