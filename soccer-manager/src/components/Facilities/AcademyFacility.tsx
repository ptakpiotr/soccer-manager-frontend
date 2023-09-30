import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  FilledInput,
  Button,
} from "@mui/material";
import { useState } from "react";
import RateStars from "../RateStars";
import { IAcademySettings } from "../../Types";
import { MdTrackChanges } from "react-icons/md";

function AcademyFacility() {
  const [academySettings, setAcademySettings] = useState<IAcademySettings>({
    secondTeamName: "",
    capacity: 0,
    facilitiesQuality: 1,
    managerQuality: 1,
  });

  const handleChanges = () => {};

  return (
    <Grid item>
      <Card
        sx={{
          minWidth: "200px",
          maxWidth: "400px",
          minHeight: "fit-content",
        }}
      >
        <CardMedia>
          <img
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            loading="lazy"
          />
        </CardMedia>
        <CardContent>
          <FilledInput
            type="text"
            placeholder="Team name"
            value={academySettings.secondTeamName}
            onChange={(e) => {
              setAcademySettings((prev) => {
                let newSettings = { ...prev };
                newSettings.secondTeamName = e.target.value;

                return newSettings;
              });
            }}
            sx={{
              margin: "0.5rem",
            }}
            required
          ></FilledInput>
          <br />
          Manager quality:{" "}
          <RateStars
            value={academySettings.managerQuality}
            setValue={(v) => {
              setAcademySettings((prev) => {
                let newSettings = { ...prev };
                newSettings.managerQuality = v;

                return newSettings;
              });
            }}
          />
          Facilities quality:{" "}
          <RateStars
            value={academySettings.facilitiesQuality}
            setValue={(v) => {
              setAcademySettings((prev) => {
                let newSettings = { ...prev };
                newSettings.facilitiesQuality = v;

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

export default AcademyFacility;
