import { Col, Row } from 'react-bootstrap';
import TreeMap from '../components/dashboard/Treemap';
import LineChart from '../components/dashboard/LineChart';

const Dashboard = ({portfolio_treemap=[]} ) => {    
    return (
        <Row>
            <Col lg={12}>  
                <TreeMap
                portfolio_treemap={portfolio_treemap}
                />    
            </Col>
            <Col lg={12}>
                <LineChart />  
            </Col>
            
        </Row>
  )
};

export default Dashboard;