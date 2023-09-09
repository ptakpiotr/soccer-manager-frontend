import { Button, Grid, List } from "@mui/material";
import { useContext, useState } from "react";
import { TacticsContext } from "../../context";
import AcademyViewPlayer from "./AcademyViewPlayer";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

//TODO: update demote/promote when backend ready
function AcademyView() {
  //temporary data retrieval
  const { reserve } = useContext(TacticsContext);
  const [academyPromoteList, setAcademyPromoteList] = useState<string[]>([]);
  const [academyDemoteList, setAcademyDemoteList] = useState<string[]>([]);

  const updateAcademyPromoteList = (playerId: string) => {
    if (academyPromoteList.includes(playerId)) {
      setAcademyPromoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    } else {
      setAcademyPromoteList((prev) => [...prev, playerId]);
    }
  };

  const updateAcademyDemoteList = (playerId: string) => {
    if (academyDemoteList.includes(playerId)) {
      setAcademyDemoteList((prev) => {
        let updated = [...prev];

        return updated.filter((p) => p !== playerId);
      });
    } else {
      setAcademyDemoteList((prev) => [...prev, playerId]);
    }
  };

  const handlePromoteClick = () => {};

  const handleDemoteClick = () => {};

  return (
    <Grid container>
      <Grid flex={6} item>
        <List
          sx={{
            overflow: "auto",
            height: "70vh",
          }}
        >
          <AcademyViewPlayer
            isPromotion={true}
            playerInfo={reserve![0]}
            updateList={updateAcademyPromoteList}
          />
          <AcademyViewPlayer
            isPromotion={true}
            playerInfo={reserve![0]}
            updateList={updateAcademyPromoteList}
          />
          <AcademyViewPlayer
            isPromotion={true}
            playerInfo={reserve![0]}
            updateList={updateAcademyPromoteList}
          />
          <AcademyViewPlayer
            isPromotion={true}
            playerInfo={reserve![0]}
            updateList={updateAcademyPromoteList}
          />
        </List>
        <Button variant="contained" color="info" endIcon={<MdArrowUpward />} onClick={handlePromoteClick}>
          Promote
        </Button>
      </Grid>
      <Grid flex={6} item>
        <List
          sx={{
            overflow: "auto",
            height: "70vh",
          }}
        >
          <AcademyViewPlayer
            isPromotion={false}
            playerInfo={reserve![0]}
            updateList={updateAcademyDemoteList}
          />
        </List>
        <Button variant="contained" color="error" endIcon={<MdArrowDownward />} onClick={handleDemoteClick}>
          Demote
        </Button>
      </Grid>
    </Grid>
  );
}

export default AcademyView;
