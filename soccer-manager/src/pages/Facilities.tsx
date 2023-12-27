import { useContext } from "react";
import { GET_FACILITY } from "../GraphQL/Queries/facilityQueries";
import FacilitiesView from "../components/Facilities/FacilitiesView";
import { useQuery as useGQLQuery } from "@apollo/client";
import { UserTokenContext } from "../context";
import { IFacilitySettings } from "../Types";
import Loading from "../components/misc/Loading";

function Facilities() {
  const { userId } = useContext(UserTokenContext);

  const { data, loading } = useGQLQuery<IFacilitySettings>(GET_FACILITY, {
    variables: {
      userId,
    },
  });
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <FacilitiesView academy={data?.academy} stadium={data?.stadium} />
    </main>
  );
}

export default Facilities;
