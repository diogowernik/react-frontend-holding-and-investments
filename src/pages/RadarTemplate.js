import { Card, Nav, Col } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router-dom";
import DistributionCalculator from "../components/radars/DistributionCalculator";


// Remove the import of withFetchData here
const RadarTemplate = ({ data, TableComponent, title }) => {
  const history = useHistory();
  return (
    <>
      <Col>
        <Card>
          <Nav variant="pills" className="flex-row">
            <Nav.Item>
              <Nav.Link onClick={() => history.push(`/radar/fiis`)}>Fiis</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => history.push(`/radar/reits`)}>Reits</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => history.push(`/radar/stocks`)}>Stocks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => history.push(`/radar/br_stocks`)}>Ações Br</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card>
        <Card>
          <Card.Header>
              <DistributionCalculator/>
          </Card.Header>
        </Card>

        <TableComponent data={data} />
      </Col>
      
    </>
  );
};

// Do not use withFetchData here
export default RadarTemplate;
