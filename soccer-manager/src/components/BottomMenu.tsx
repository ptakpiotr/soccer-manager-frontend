import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useContext, useState } from "react";
import { UserSettingsContext } from "../context";
import Globals from "../Globals";
import { useNavigate } from "react-router-dom";

function BottomMenu() {
  const { bottomMenu } = useContext(UserSettingsContext);
  const [navigation, _] = useState(Globals.navigation);
  const [currentSelection, setCurrentSelection] = useState<number>(
    Globals.navigation.indexOf(
      Globals.navigation.find((g) => g.itemText === "Settings")!
    )
  );

  const navigate = useNavigate();

  const handleChange = (_: any, value: number) => {
    setCurrentSelection(value);
    navigate(navigation[value].url, { replace: true });
  };

  if (bottomMenu) {
    return (
      <BottomNavigation
        className="app-bottom-navigation-menu"
        value={currentSelection}
        onChange={handleChange}
        showLabels
      >
        {navigation.map((n, i) => (
          <BottomNavigationAction
            key={n.itemText}
            label={n.itemText}
            value={i}
            icon={<>{n.itemIcon()}</>}
          />
        ))}
      </BottomNavigation>
    );
  } else {
    return <></>;
  }
}

export default BottomMenu;
