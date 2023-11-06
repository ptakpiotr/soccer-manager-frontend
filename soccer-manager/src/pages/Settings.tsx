import { useContext } from "react";
import AppSwitch from "../components/AppSwitch";
import { UserSettingsContext, UserTokenContext } from "../context";
import AppPaper from "../components/AppPaper";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import {
  MdFormatPaint,
  MdAccountCircle,
  MdExpandMore,
  MdAdminPanelSettings,
  MdSave,
} from "react-icons/md";
import ManageAccountActionCenter from "../components/Account/ManageAccountActionCenter";
import ColorThemePicker from "../components/misc/ColorThemePicker";
import AdminPanel from "../components/Account/AdminPanel";
import ProtectedAreaView from "../components/misc/ProtectedAreaView";
import AuthorizedArea from "../AuthorizedArea";
import IsAdminArea from "../IsAdminArea";

import { useUserPreferencesMutation } from "../hooks/useUserPreferencesMutation";

function Settings() {
  const { userId } = useContext(UserTokenContext);

  const { mutate, data } = useUserPreferencesMutation();

  const { mode, bottomMenu, navbarColor, setMode, enableBottomMenu } =
    useContext(UserSettingsContext);

  const setModeValue = () => {
    if (setMode) {
      setMode((prev) => {
        if (prev === "light") {
          return "dark";
        }
        return "light";
      });
    }
  };

  const setBottomMenu = () => {
    if (enableBottomMenu) {
      enableBottomMenu((prev) => !prev);
    }
  };

  const savePreferences = async () => {
    await mutate({
      variables: {
        userId,
        mode,
        bottomMenu,
        navbarColor,
      },
    });

    if (data) {
      console.log("Preferences changed");
    }
  };

  return (
    <main>
      <AppPaper>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="settings1-content"
            id="settings1-header"
          >
            <Typography>
              <MdFormatPaint /> User preferences
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AppSwitch desc="Mode" value={mode} setValue={setModeValue} />
            <AppSwitch
              desc="Bottom menu"
              value={bottomMenu}
              setValue={setBottomMenu}
            />
            <Grid container alignItems="center" columnGap="1rem">
              <ColorThemePicker /> <Typography>| Main color</Typography>
            </Grid>
            <Button
              startIcon={<MdSave />}
              color="secondary"
              onClick={savePreferences}
            >
              Save
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="settings2-content"
            id="settings2-header"
          >
            <Typography>
              <MdAdminPanelSettings /> Admin panel settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IsAdminArea notAuthorizedComponent={<ProtectedAreaView />}>
              <AdminPanel />
            </IsAdminArea>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="settings3-content"
            id="settings3-header"
          >
            <Typography>
              <MdAccountCircle /> Account settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ManageAccountActionCenter />
          </AccordionDetails>
        </Accordion>
      </AppPaper>
    </main>
  );
}

export default Settings;
