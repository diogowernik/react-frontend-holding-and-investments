import { Row, Col, Nav, Card} from 'react-bootstrap';
import React, { } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';


const PortfolioNav = () => {
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
                        <Nav.Link onClick={() => history.push(`/portfolio/${params.id}/brl`)}>Portfolio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/brokers/${params.id}/brl`)}>Corretoras</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/dividends/${params.id}/brl`)}>Dividendos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/evolution/${params.id}`)}>Evolução</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  </Col>
                  <Col lg={5}>
                    <Nav variant="pills" className="flex-row">   
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/fiis/${params.id}/brl`)}>Fiis</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/br_stocks/${params.id}/brl`)}>Ações</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/stocks/${params.id}/brl`)}>Stocks</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/reits/${params.id}/brl`)}>Reits</Nav.Link>
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
                      <Nav.Item>
                          <Nav.Link onClick={() => history.push(`/portfolio/${params.id}/brl`)}>
                            <AiFillEyeInvisible size={22} />
                          </Nav.Link>
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

export default PortfolioNav;