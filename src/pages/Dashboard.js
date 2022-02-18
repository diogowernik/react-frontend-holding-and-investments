import { Col, Row } from 'react-bootstrap';
import TreeMap from '../components/dashboard/Treemap';
import LineChart from '../components/dashboard/LineChart';
import PieChart from '../components/dashboard/PieChart';

const Dashboard = ({data=[],fiis=[],criptos=[]} ) => {    
    return (
        <Row>
            <Col lg={6}>
                <PieChart fiis={fiis} criptos={criptos}/> 
            </Col>
            <Col lg={6}>
                <LineChart data={data}/>  
            </Col>
            <Col lg={12}>  
                <TreeMap data={data}/>    
            </Col>
            

        </Row>
  )
};

export default Dashboard;