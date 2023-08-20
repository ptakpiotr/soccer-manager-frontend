import { Drawer, MenuList } from "@mui/material";
import React from "react";
import MenuOption from "./MenuOption";
import Globals from "../Globals";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SidebarMenu({ open, setOpen }: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      variant="temporary"
      anchor="left"
    >
      <MenuList>
        {Globals.navigation.map(n=>(<MenuOption key={n.itemText} {...n} />))}
      </MenuList>
    </Drawer>
  );
}

export default SidebarMenu;
