import { IconButton, Menu, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { MdPersonOutline, MdAppRegistration, MdLogin } from "react-icons/md";
import AccountMenuItem from "./AccountMenuItem";

function AccountMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleAccountButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Tooltip title="Account menu">
        <IconButton ref={menuRef} onClick={handleAccountButtonClick}>
          <MdPersonOutline color={"#fefefa"} />
        </IconButton>
      </Tooltip>
      <Menu
        open={isMenuOpen}
        anchorEl={menuRef.current}
        onClose={handleMenuClose}
      >
        <AccountMenuItem
          address="/register"
          name="Register"
          icon={MdAppRegistration}
          closeMenu={handleMenuClose}
        />
        <AccountMenuItem
          address="/login"
          name="Login"
          icon={MdLogin}
          closeMenu={handleMenuClose}
        />
      </Menu>
    </>
  );
}

export default AccountMenu;
