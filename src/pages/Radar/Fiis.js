import { fetchFiis } from "../../apis";
import  withFetchData  from "../../hocs/withFetchData";
import RadarTemplate from "../RadarTemplate";

const Radar = ({ data }) => {
    console.log(data)
  
    return (
      <RadarTemplate
        data={data} 
      />
    )
  };
  
  export default withFetchData(Radar, fetchFiis);