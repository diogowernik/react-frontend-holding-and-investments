import { Nav, Card } from 'react-bootstrap';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const PortfolioNavTemplate = ({currency}) => {
  const params = useParams();
  const history = useHistory();

  return (
    <>
      <Card className="mb-3">
        <Card.Header>Radar Menu</Card.Header>
        <Card.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link eventKey="link-1" onClick={() => history.push(`/radar/${params.id}/fiis`)}>Fiis</Nav.Link>
            <Nav.Link eventKey="link-2" onClick={() => history.push(`/radar/${params.id}/reits`)}>Reits</Nav.Link>
            <Nav.Link eventKey="link-3" onClick={() => history.push(`/radar/${params.id}/stocks`)}>Stocks</Nav.Link>
            <Nav.Link eventKey="link-4" onClick={() => history.push(`/radar/${params.id}/br_stocks`)}>Ações Br</Nav.Link>
          </Nav>
        </Card.Body>
      </Card>
    </>
  );
};

export default PortfolioNavTemplate;