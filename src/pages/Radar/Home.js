import { fetchFiis } from "../../apis";
import FiisTable from "../../components/radars/FiisTable";
import RadarTemplate from "../RadarTemplate";
import  withFetchData  from "../../hocs/withFetchData";  // mantenha essa linha

const FiisRadar = ({ data }) => (
  <RadarTemplate
    data={data}
    TableComponent={FiisTable}
    title="Radar"
  />
);

// Use withFetchData here as you were doing
export default withFetchData(FiisRadar, fetchFiis);



