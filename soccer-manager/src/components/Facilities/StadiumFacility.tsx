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
import { useState, useContext } from "react";
import { IStadiumSettings } from "../../Types";
import { useStadiumMutation } from "../../hooks/useStadiumMutation";
import { UserTokenContext } from "../../context";

interface IProps {
  stadium?: IStadiumSettings;
}

function StadiumFacility({ stadium }: IProps) {
  const { userId } = useContext(UserTokenContext);

  const [stadiumSettings, setStadiumSettings] = useState<IStadiumSettings>(
    stadium ?? {
      stadiumId: userId ?? "",
      stadiumName: "",
      capacity: 0,
      seatQuality: 1,
      fansExtrasQuality: 1,
    }
  );

  const { mutate, data } = useStadiumMutation(stadium);

  const handleChanges = async () => {
    // let vars: typeof exists extends true
    //   ? Omit<IStadiumSettings, "stadiumId">
    //   : IStadiumSettings = stadiumSettings;

    await mutate({
      variables: {
        ...stadiumSettings,
      },
    });

    if (data) {
      console.log("Succesfully upgraded stadium");
    }
  };

  return (
    <Grid item flex={1}>
      <Card
        sx={{
          minWidth: "200px",
          maxWidth: "400px",
          minHeight: "fit-content",
        }}
      >
        <CardMedia>
          <img
            src="https://images.unsplash.com/photo-1507226353400-5ec8e43add88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
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
