import { useState } from "react";
import TransfersTable from "./TransfersTable";
import TransfersPaging from "./TransfersPaging";
import TransfersFilters from "./TransfersFilters";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { MdExpandMore } from "react-icons/md";

function TransfersView() {
  const [currentlyChosenPage, setCurrentlyChosenPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const maxNumPage = 10;

  const setPage = (p: number) => {
    setCurrentlyChosenPage(p);
    //TODO: fetch new data
  };

  const callSearch = () => {};

  return (
    <div>
      <Accordion elevation={0} >
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography variant="h6">
            Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TransfersFilters callSearch={callSearch} />
        </AccordionDetails>
      </Accordion>
      <TransfersTable />
      <TransfersPaging
        currentPage={currentlyChosenPage}
        maxPage={maxNumPage}
        setPage={setPage}
      />
    </div>
  );
}

export default TransfersView;
