import { useEffect, useState } from "react";
import TeamInfoView from "../components/TeamInfo/TeamInfoView";
import { useParams } from "react-router-dom";
import { useLazyQuery as useLazyGQLQuery } from "@apollo/client";
import { GET_SHIRTS, GET_TEAMVIEW } from "../GraphQL/Queries/miscQueries";
import {
  ISoccerShirt,
  ITeamInfoData,
  ITeamInfoView,
  ITeamShirts,
} from "../Types";
import { guidSchema } from "../Validation";
import InvalidData from "../components/misc/InvalidData";
import NotExists from "../components/misc/NotExists";

function TeamInfo() {
  const { id } = useParams();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [shirts, setShirts] = useState<ISoccerShirt[] | undefined>();
  const [teamInfo, setTeamInfo] = useState<ITeamInfoData | undefined>();

  const [getShirts] = useLazyGQLQuery<ITeamShirts>(GET_SHIRTS, {
    variables: {
      teamId: id,
    },
    pollInterval: 360000,
  });

  const [getTeamData] = useLazyGQLQuery<ITeamInfoView>(GET_TEAMVIEW, {
    variables: {
      teamId: id,
    },
    pollInterval: 360000,
  });

  useEffect(() => {
    const isIdValid = guidSchema.isValidSync({ teamId: id });
    setIsValid(isIdValid);

    if (isIdValid) {
      collectData()
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const collectData = async () => {
    const { data: shirtsData } = await getShirts();
    const { data: teamData } = await getTeamData();

    setShirts(shirtsData?.shirts);
    setTeamInfo(teamData?.teams.nodes[0]);
  };

  return (
    <main>
      {isValid && shirts && teamInfo ? (
        <TeamInfoView shirts={shirts} teamInfo={teamInfo} />
      ) : !isValid ? (
        <InvalidData />
      ) : (
        <NotExists />
      )}
    </main>
  );
}

export default TeamInfo;
