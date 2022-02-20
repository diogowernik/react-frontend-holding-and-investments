import { Col, Row } from 'react-bootstrap';
import TreeMap from '../components/dashboard/Treemap';
import LineChart from '../components/dashboard/LineChart';
import Tokenize from '../components/dashboard/Tokenize';

const Dashboard = ({portfolio_treemap=[]} ) => {    
    return (
        <Row>
            <Col lg={7}>
                <LineChart />  
            </Col>
            <Col lg={5}>
                <Tokenize 
                
                />  
            </Col>
            <Col lg={12}>  
                <TreeMap
                portfolio_treemap={portfolio_treemap}
                />    
            </Col>
        </Row>
  )
};

export default Dashboard;