import { fetchBrStocks } from "../../apis";
import BrStocksTable from "../../components/radars/BrStocksTable";
import RadarTemplate from "../RadarTemplate";
import  withFetchData  from "../../hocs/withFetchData";  // mantenha essa linha

const BrStocksRadar = ({ data }) => (
  <RadarTemplate
    data={data}
    TableComponent={BrStocksTable}
    title="Radar"
  />
);

// Use withFetchData here as you were doing
export default withFetchData(BrStocksRadar, fetchBrStocks);