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
import { ISoccerShirt, SoccerShirtType } from "../../Types";

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const types = (
  Object.keys(SoccerShirtType) as Array<keyof typeof SoccerShirtType>
).map((key) => ({
  key,
  value: SoccerShirtType[key],
}));

interface IProps {
  kitSetup: ISoccerShirt;
  handleMainColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSecondaryColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShirtTypeChange: (e: SelectChangeEvent<SoccerShirtType>) => void;
  handleAccept: () => void;
  handleRestore: () => void;
}

function StyleTeamAttribute({
  kitSetup,
  handleMainColorChange,
  handleSecondaryColorChange,
  handleAccept,
  handleRestore,
  handleShirtTypeChange,
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
              value={kitSetup.mainColor}
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
              value={kitSetup.secondaryColor}
              onChange={handleSecondaryColorChange}
              id="secondary-color"
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid item>
        <AppSelect
          elementName="kit-type"
          label="Kit type"
          value={kitSetup.type}
          elements={types}
          handleChange={handleShirtTypeChange}
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

export default StyleTeamAttribute;
