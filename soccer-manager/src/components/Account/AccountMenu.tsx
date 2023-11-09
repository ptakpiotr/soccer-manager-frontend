import { IconButton, Menu, MenuList, Tooltip } from "@mui/material";
import { useContext, useRef, useState } from "react";
import {
  MdPersonOutline,
  MdAppRegistration,
  MdLogin,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import AccountMenuItem from "./AccountMenuItem";
import { UserTokenContext } from "../../context";

function AccountMenu() {
  const { token } = useContext(UserTokenContext);

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
        {token ? (
          <MenuList>
            <AccountMenuItem
              address="/settings"
              name="Settings"
              icon={MdSettings}
              closeMenu={handleMenuClose}
            />
            <AccountMenuItem
              address="/logout"
              name="Logout"
              icon={MdLogout}
              closeMenu={handleMenuClose}
            />
          </MenuList>
        ) : (
          <MenuList>
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
          </MenuList>
        )}
      </Menu>
    </>
  );
}

export default AccountMenu;
