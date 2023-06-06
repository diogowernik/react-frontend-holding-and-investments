import { Row, Col, Nav, Card} from 'react-bootstrap';
import React, { } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const PortfolioNavTemplate = ({currency}) => {
  const params = useParams();
  const history = useHistory();

  return (
    <>
      <Row>
        <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Row>
                  <Col lg={5}>
                  <Nav variant="pills" className="flex-row">   
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/portfolio/${params.id}/${currency}`)}>Portfolio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/brokers/${params.id}/${currency}`)}>Corretoras</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/dividends/${params.id}/${currency}`)}>Dividendos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/evolution/${params.id}`)}>Evolução</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  </Col>
                  <Col lg={5}>
                    <Nav variant="pills" className="flex-row">   
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/fiis/${params.id}/${currency}`)}>Fiis</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/br_stocks/${params.id}/${currency}`)}>Ações</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/stocks/${params.id}/${currency}`)}>Stocks</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/reits/${params.id}/${currency}`)}>Reits</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={2} className="text-right">
                    <Nav variant="pills" className="flex-row justify-content-end"> 
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/portfolio/${params.id}/usd`)}>Usd</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/portfolio/${params.id}/brl`)}>Brl</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                </Row>
              </Card.Header>
          </Card>
        </Col>
      </Row>

      
    </>
  )
};

export default PortfolioNavTemplate;