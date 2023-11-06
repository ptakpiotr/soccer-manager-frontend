import { useContext, useMemo, useState } from "react";
import TransfersTable from "./TransfersTable";
import TransfersPaging from "./TransfersPaging";
import TransfersFilters from "./TransfersFilters";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import {
  IPlayerTransfers,
  PlayerTransferType,
  TransferFilterKeys,
} from "../../Types";
import { gql } from "@apollo/client";
import { gqlClient } from "../../main";
import Enumerable from "linq";
import NoData from "../misc/NoData";
import Globals from "../../Globals";
import { UserTokenContext } from "../../context";

interface IProps {
  players: PlayerTransferType[];
}

const maxPlayersPerPage = 7;

function TransfersView({ players }: IProps) {
  const { teamId } = useContext(UserTokenContext);

  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const maxNumPage = useMemo(() => {
    return Math.ceil(filteredPlayers.length / 10);
  }, [filteredPlayers]);

  const [currentlyChosenPage, setCurrentlyChosenPage] = useState<number>(1);

  const chosenPlayers = useMemo(() => {
    return Enumerable.from(filteredPlayers)
      .skip((currentlyChosenPage - 1) * maxPlayersPerPage)
      .take(maxPlayersPerPage)
      .toArray();
  }, [filteredPlayers, currentlyChosenPage]);

  const setPage = (p: number) => {
    setCurrentlyChosenPage(p);
  };

  const callSearch = async (filterValues: TransferFilterKeys) => {
    const query = Globals.functions.buildDynamicFilteredGraphQLQuery(
      teamId!,
      filterValues
    );

    const { data, error } = await gqlClient.query<IPlayerTransfers>({
      query: gql`
        ${query}
      `,
    });

    if (!error && data) {
      setFilteredPlayers(data.transfers);
      setCurrentlyChosenPage(0);
    }
  };

  return (
    <div>
      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography variant="h6">Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TransfersFilters callSearch={callSearch} />
        </AccordionDetails>
      </Accordion>
      {chosenPlayers && chosenPlayers.length > 0 ? (
        <TransfersTable playerTransfers={chosenPlayers} />
      ) : (
        <NoData />
      )}
      <TransfersPaging
        currentPage={currentlyChosenPage}
        maxPage={maxNumPage}
        setPage={setPage}
      />
    </div>
  );
}

export default TransfersView;
