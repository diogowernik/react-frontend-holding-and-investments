import { Card, Col, Row } from 'react-bootstrap';
import React, {  } from 'react';

const Fiis = () => {

  return (
        <Row>
            <Col lg={12}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Fiis</Card.Header>
                    <Card.Body>
                    Table
                    </Card.Body>
                </Card>  
            </Col>
        </Row>
  )
};

export default Fiis;