import { useContext } from "react";
import AppSwitch from "../components/AppSwitch";
import { UserSettingsContext } from "../context";
import AppPaper from "../components/AppPaper";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {
  MdFormatPaint,
  MdAccountCircle,
  MdExpandMore,
  MdSettings,
} from "react-icons/md";

function Settings() {
  const { mode, bottomMenu, setMode, enableBottomMenu } =
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
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="settings2-content"
            id="settings2-header"
          >
            <Typography>
              <MdSettings /> System settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
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
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </AppPaper>
    </main>
  );
}

export default Settings;