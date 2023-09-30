import { Card } from "@mui/material";
import { NavbarColors } from "../../Types";

interface IProps {
  color: NavbarColors;
  setColor: (color: NavbarColors) => void;
}

function ColorSingleItem({ color, setColor }: IProps) {
  return (
    <Card
      className="color-single-item"
      sx={{
        backgroundColor: color as string,
      }}
      onClick={() => {
        setColor(color);
      }}
    ></Card>
  );
}

export default ColorSingleItem;
