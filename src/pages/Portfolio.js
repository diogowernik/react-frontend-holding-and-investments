import { IoMdArrowBack } from 'react-icons/io';
// import { AiOutlineDelete} from 'react-icons/ai';
import { Row, Col, Button, Container, Nav, Card, Table } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import {fetchPortfolio,
  //  removePortfolio,
  } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';



const Portfolio = ({ children }) => {
  const [portfolio, setPortfolio] = useState({});
  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push("/portfolios");

  const onFetchPortfolio = async () => {
    const json = await fetchPortfolio(params.id, auth.token);
    if (json) {
      setPortfolio(json);
    }
  };

  // const onRemovePortfolio = () => {
  //   const c = window.confirm("Are you sure?");
  //   if (c) {
  //     removePortfolio(params.id, auth.token).then(onBack);
  //   }
  // };

  useEffect(() => {
    onFetchPortfolio();
  }, []);

  return (
    <MainLayout>
      <Container fluid>
      <Row>
        <Col lg={3}>
          <Card className="mb-3">
            <Card.Header>
                <Button variant="link" onClick={onBack} className="float-left">
                  <IoMdArrowBack size={25} color="black" />
                </Button>
                <h3 className="mb-0 ml-2 mr-2 text-center">{portfolio.name}</h3>

                {/* <Button variant="link" onClick={onRemovePortfolio}>
                  <AiOutlineDelete size={25} color="red" />
                </Button> */}
            </Card.Header>
          </Card>
        </Col> 
        <Col lg={9}>
        <Card className=" mb-3">
            <Card.Header>
                <Nav variant="pills" >

                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/portfolios/${portfolio.id}/dashboard`) }>Dashboard</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link onClick={() => history.push(`/portfolios/${portfolio.id}/fiis`)}>Fiis</Nav.Link>
                    </Nav.Item>

                </Nav>
            </Card.Header>
        </Card>
        </Col>
        <Col lg={3}>
          <Card  color="gray" className="mb-3">
            <Card.Header className="bg-gray-lighter">Performance</Card.Header>
              <Card.Body>
              <p className="text-center h3 m-3 text-primary">
              
              5,35 %
              </p>
              <p className="text-center text-muted m-3">
              
              Rentabilidade do porfólio Atual
              </p>
              </Card.Body>
              <Card.Body>
                  <Table responsive>
                      <tbody>
                          <tr>
                              <td>Patrimônio</td>
                              <td><div className="float-right strong">R$ 535.000</div></td>
                          </tr>
                          <tr>
                              <td>Custo de aquisição</td>
                              <td><div className="float-right strong">R$ 500.000</div></td>
                          </tr>
                          <tr>
                              <td>Proventos Acumulado</td>
                              <td><div className="float-right strong">R$ 20.000</div></td>
                          </tr>
                          <tr>
                              <td>Lucros com operações</td>
                              <td><div className="float-right strong">R$ 15.000</div></td>
                          </tr>
                          <tr className="mt-1">
                              <th><div className="mt-2 strong">Lucro</div></th>
                              <th><div className="float-right h5 text-primary">R$ 35.000</div></th>
                          </tr>
                      </tbody>
                      
                          
                      
                  </Table>
              </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>   
              { children }
        </Col>
        
      </Row>
      </Container>


    </MainLayout>
  )
};

export default Portfolio;