import { MenuItem } from "@mui/material";
import { IconType, IconBaseProps } from "react-icons";
import { useNavigate } from "react-router-dom";

interface IProps {
  itemText: string;
  itemIcon: IconType;
  url: string;
  iconProps?: IconBaseProps;
}

function MenuOption({ itemText, itemIcon, url, iconProps }: IProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <MenuItem
      sx={{
        margin: "0.5rem",
      }}
      onClick={handleClick}
    >
      <span
        style={{
          padding: "0.25rem",
        }}
      >
        {itemIcon(iconProps ?? {})} {itemText}
      </span>
    </MenuItem>
  );
}

export default MenuOption;
