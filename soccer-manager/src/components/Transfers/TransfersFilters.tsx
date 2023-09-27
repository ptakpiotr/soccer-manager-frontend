import { useEffect, useState } from "react";
import TransferFilter from "./TransferFilter";
import { TransferFilterKeys, TransferFilterType } from "../../Types";
import { Button, Grid } from "@mui/material";

import { MdSearch, MdClear } from "react-icons/md";
import Globals from "../../Globals";

interface IProps {
  callSearch: () => void;
}

function TransfersFilters({ callSearch }: IProps) {
  const [filterValues, setFilterValues] = useState<TransferFilterKeys>({});

  useEffect(() => {
    const storageFilterValues = localStorage.getItem("filterValues");

    if (storageFilterValues) {
      setFilterValues(JSON.parse(storageFilterValues));
    }
  }, []);

  const validateFilter = <U,>(filter: { from?: U; to?: U }) => {
    const { from, to } = filter;

    try {
      if (typeof from === "string" && typeof to === "string") {
        parseInt(from);
        parseInt(to);
      }
    } catch {
      return false;
    }

    return true;
  };

  const setSingleFilterValue = <T,>(
    filterKey: keyof TransferFilterKeys,
    from?: T,
    to?: T
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterKey]: {
        from: from ? from : prev[filterKey]?.from,
        to: to ? to : prev[filterKey]?.to,
      },
    }));
  };

  const clearFilters = () => {
    localStorage.setItem("filterValues", JSON.stringify({}));
    setFilterValues({});
  };

  const handleSearch = () => {
    localStorage.setItem("filterValues", JSON.stringify(filterValues));
    callSearch();
  };

  return (
    <Grid container flexDirection="row" alignItems="center" columnGap="1rem">
      {Globals.availableFilters.map((a) => (
        <TransferFilter
          filterKey={a.filterKey}
          filterType={TransferFilterType.NUMERIC}
          label={a.filterName}
          setValue={setSingleFilterValue}
          from={filterValues[a.filterKey]?.from ?? ""}
          to={filterValues[a.filterKey]?.to ?? ""}
          validateFilter={validateFilter}
        />
      ))}
      <Grid item alignSelf="flex-end">
        <Button
          variant="contained"
          color="info"
          endIcon={<MdSearch />}
          sx={{ marginRight: "1rem" }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<MdClear />}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}

export default TransfersFilters;
