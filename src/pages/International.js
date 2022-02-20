import { Card, Col, Row } from 'react-bootstrap';
import React, {  } from 'react';
import AssetTable from '../components/assets/AssetTable';

const Internationals = ({data=[]}) => {

  return (
        <Row>
            <Col lg={12}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Investimentos no Exterior</Card.Header>
                    <Card.Body>
                    <AssetTable data={data}/>
                    </Card.Body>
                </Card>  
            </Col>
        </Row>
  )
};

export default Internationals;