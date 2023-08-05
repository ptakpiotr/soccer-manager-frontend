import React, { useContext, useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, Grid } from "@mui/material";
import { MdMenu, MdPersonOutline } from "react-icons/md";
import SidebarMenu from "./SidebarMenu";
import { UserSettingsContext } from "../context";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { bottomMenu } = useContext(UserSettingsContext);

  const handleOpenMenuClick = () => {
    setIsOpenMenu(true);
  };

  return (
    <>
      <SidebarMenu open={isOpenMenu} setOpen={setIsOpenMenu} />
      <AppBar position="static">
        <Toolbar>
          <Grid container direction={"row"}>
            <Grid container alignItems="center" flex={1}>
              {!bottomMenu && (
                <IconButton onClick={handleOpenMenuClick}>
                  <MdMenu color={"#fefefa"} />
                </IconButton>
              )}
              <Typography variant="h6" component="span">
                Soccer manager
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <MdPersonOutline color={"#fefefa"} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
