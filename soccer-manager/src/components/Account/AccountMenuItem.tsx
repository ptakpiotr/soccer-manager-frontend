import { Grid, MenuItem, MenuItemProps } from "@mui/material";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface IProps extends MenuItemProps {
  icon: IconType;
  name: string;
  address: string;
  closeMenu: () => void;
}

function AccountMenuItem(props: IProps) {
  const { icon, name, address, closeMenu } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    closeMenu();
    navigate(address);
  };

  return (
    <MenuItem onClick={handleClick} {...props}>
      <Grid container alignItems="center" columnGap="0.25rem">
        <Grid item>{icon({ fontSize: 14 })}</Grid>
        <Grid item>{name}</Grid>
      </Grid>
    </MenuItem>
  );
}

export default AccountMenuItem;
