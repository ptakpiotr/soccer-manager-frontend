import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import AppSelect from "../AppSelect";
import { ChangeEvent } from "react";
import { ISoccerLogo, ISoccerShirt, SoccerShirtType } from "../../Types";
import AppIconPicker from "../AppIconPicker";
import Globals from "../../Globals";

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const types = (
  Object.keys(SoccerShirtType) as Array<keyof typeof SoccerShirtType>
).map((key) => ({
  key,
  value: SoccerShirtType[key],
}));

interface IProps {
  logoSetup: ISoccerLogo;
  handleMainColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSecondaryColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShirtTypeChange: (e: SelectChangeEvent<SoccerShirtType>) => void;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChosenIconIdChange: (e: string) => void;
  handleAccept: () => void;
  handleRestore: () => void;
}

function LogoDesignerPanel({
  logoSetup,
  handleMainColorChange,
  handleSecondaryColorChange,
  handleAccept,
  handleRestore,
  handleShirtTypeChange,
  handleNameChange,
  handleChosenIconIdChange,
}: IProps) {
  return (
    <Grid
      container
      justifyContent={"flex-start"}
      rowGap={"1rem"}
      flexDirection={"column"}
    >
      <Grid container columnGap={"1rem"}>
        <Grid item>
          <FormControl>
            <InputLabel>Main</InputLabel>
            <FilledInput
              type="color"
              value={logoSetup.mainColor}
              onChange={handleMainColorChange}
              id="first-color"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Secondary</InputLabel>
            <FilledInput
              type="color"
              value={logoSetup.secondaryColor}
              onChange={handleSecondaryColorChange}
              id="secondary-color"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Team name</InputLabel>
          <FilledInput
            value={logoSetup.name}
            onChange={handleNameChange}
            id="team-name"
          />
        </FormControl>
      </Grid>

      <Grid item>
        <AppSelect
          elementName="logo-type"
          label="Logo type"
          value={logoSetup.type}
          elements={types}
          handleChange={handleShirtTypeChange}
        />
      </Grid>
      <Grid item>
        <AppIconPicker
          icons={Globals.availableLogoIcons}
          chosenIconId={logoSetup.iconId}
          setChosenIconId={handleChosenIconIdChange}
        />
      </Grid>
      <Grid container columnGap={"1rem"} justifyContent={"center"}>
        <Button variant="contained" color="success" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="contained" color="error" onClick={handleRestore}>
          Restore
        </Button>
      </Grid>
    </Grid>
  );
}

export default LogoDesignerPanel;
