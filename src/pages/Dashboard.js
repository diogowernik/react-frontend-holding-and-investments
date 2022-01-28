import { Card, Col, Row } from 'react-bootstrap';
import React, {  } from 'react';
import Portfolio from './Portfolio';

const Dashboard = () => {

  return (
    <Portfolio>
        <Row>
            <Col lg={6}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Dashboard</Card.Header>
                    <Card.Body>
                    Gráfico 1
                    </Card.Body>
                </Card>  
            </Col>
            <Col lg={6}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Dashboard</Card.Header>
                    <Card.Body>
                    Gráfico 1
                    </Card.Body>
                </Card>  
            </Col>
            <Col lg={12}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Dashboard</Card.Header>
                    <Card.Body>
                    Gráfico 1
                    </Card.Body>
                </Card>  
            </Col>
        </Row>
    </Portfolio>
  )
};

export default Dashboard;