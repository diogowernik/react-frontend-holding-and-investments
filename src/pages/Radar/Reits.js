import { fetchReits } from "../../apis";
import ReitsTable from "../../components/radars/ReitsTable";
import RadarTemplate from "../RadarTemplate";
import  withFetchData  from "../../hocs/withFetchData";  // mantenha essa linha

const ReitsRadar = ({ data }) => (
  <RadarTemplate
    data={data}
    TableComponent={ReitsTable}
    title="Radar"
  />
);

// Use withFetchData here as you were doing
export default withFetchData(ReitsRadar, fetchReits);