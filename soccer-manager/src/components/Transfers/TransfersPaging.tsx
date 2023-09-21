import React from "react";
import { Grid, Pagination } from "@mui/material";

interface IProps {
  currentPage: number;
  maxPage: number;
  setPage: (p: number) => void;
}

function TransfersPaging({ currentPage, maxPage, setPage }: IProps) {
  return (
    <Grid container marginTop="1rem" justifyContent="center">
      <Pagination
        count={maxPage}
        page={currentPage}
        onChange={(_, page) => {
          setPage(page);
        }}
        color="primary"
      />
    </Grid>
  );
}

export default TransfersPaging;
