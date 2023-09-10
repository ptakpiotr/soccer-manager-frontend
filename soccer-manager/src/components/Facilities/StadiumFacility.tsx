import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FilledInput,
  Grid,
} from "@mui/material";
import { MdTrackChanges } from "react-icons/md";
import RateStars from "../RateStars";
import { useState } from "react";
import { IStadiumSettings } from "../../Types";

function StadiumFacility() {
  const [stadiumSettings, setStadiumSettings] = useState<IStadiumSettings>({
    stadiumName: "",
    capacity: 0,
    seatQuality: 1,
    fansExtrasQuality: 1,
  });

  const handleChanges = () => {
    //supply changes
  };

  return (
    <Grid item>
      <Card
        sx={{
          minWidth: "200px",
          maxWidth: "300px",
          minHeight: "fit-content",
        }}
      >
        <CardMedia>
          <img
            src="https://images.unsplash.com/photo-1507226353400-5ec8e43add88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
            loading="lazy"
          />
        </CardMedia>
        <CardContent>
          <FilledInput
            type="text"
            placeholder="Stadium name"
            value={stadiumSettings.stadiumName}
            onChange={(e) => {
              setStadiumSettings((prev) => {
                let newSettings = { ...prev };
                newSettings.stadiumName = e.target.value;

                return newSettings;
              });
            }}
            sx={{
              margin: "0.5rem",
            }}
            required
          ></FilledInput>
          <br />
          <FilledInput
            type="number"
            placeholder="Capacity"
            value={stadiumSettings.capacity}
            onChange={(e) => {
              setStadiumSettings((prev) => {
                let newSettings = { ...prev };
                newSettings.capacity = parseInt(e.target.value);

                return newSettings;
              });
            }}
            sx={{
              margin: "0.5rem",
            }}
            required
          ></FilledInput>
          <br />
          Seat quality:{" "}
          <RateStars
            value={stadiumSettings.seatQuality}
            setValue={(v) => {
              setStadiumSettings((prev) => {
                let newSettings = { ...prev };
                newSettings.seatQuality = v;

                return newSettings;
              });
            }}
          />
          Fans' extras:{" "}
          <RateStars
            value={stadiumSettings.fansExtrasQuality}
            setValue={(v) => {
              setStadiumSettings((prev) => {
                let newSettings = { ...prev };
                newSettings.fansExtrasQuality = v;

                return newSettings;
              });
            }}
          />
          <Button
            variant="contained"
            endIcon={<MdTrackChanges />}
            onClick={handleChanges}
          >
            Apply changes
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StadiumFacility;
