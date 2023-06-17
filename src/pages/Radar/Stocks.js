import { fetchStocks } from "../../apis";
import StocksTable from "../../components/radars/StocksTable";
import RadarTemplate from "../RadarTemplate";
import  withFetchData  from "../../hocs/withFetchData";  // mantenha essa linha

const StocksRadar = ({ data }) => (
  <RadarTemplate
    data={data}
    TableComponent={StocksTable}
    title="Radar"
  />
);

// Use withFetchData here as you were doing
export default withFetchData(StocksRadar, fetchStocks);