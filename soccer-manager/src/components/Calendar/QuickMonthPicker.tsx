import {
  Button,
  Dialog,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdCalendarMonth, MdSearch } from "react-icons/md";
import AppSelect from "../AppSelect";
import { Months } from "../../Types";

interface IProps{
    month: Months;
    setMonth:React.Dispatch<React.SetStateAction<Months>>;
}

//Mapping inspired here: https://stackoverflow.com/questions/41308123/map-typescript-enum
const months = (Object.keys(Months) as Array<keyof Months>)
  .map((k) => {
    const numK = Number(k);
    if (numK) {
      return {
        value: numK,
        desc: Months[numK],
      };
    }
  })
  .filter((k) => k) as {
  value: number;
  desc: string;
}[];

function QuickMonthPicker({month, setMonth} : IProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleMonthTypeChange = (e: SelectChangeEvent<number>) => {
    setMonth(e.target.value as number as Months);
  };

  const handleSearch = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <MdCalendarMonth />
        </Button>
        <Typography>{Months[month]}</Typography>
      </>
      <Dialog open={isOpen}>
        <Grid
          container
          padding={"3rem"}
          flexDirection={"column"}
          rowGap={"1rem"}
        >
          <FormControl>
            <AppSelect
              elementName="month-name"
              label="Month name"
              value={month}
              elements={months}
              handleChange={handleMonthTypeChange}
              style={{ width: "200px" }}
            />
          </FormControl>
          <Button
            endIcon={<MdSearch />}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}

export default QuickMonthPicker;
