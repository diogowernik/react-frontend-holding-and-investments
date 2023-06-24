import { Row, Col, Container, Card} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioRadars } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import PortfolioNavTemplate from '../components/nav/PortfolioNavTemplate';

const Radar = () => {
  const [radars, setPortfolioRadars] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  const onFetchPortfolioRadars = useCallback(async () => {
    const json = await fetchPortfolioRadars(params.id, auth.token);
    if (json) {
        setPortfolioRadars(json);
    }
    }, [params.id, auth.token]);
    useEffect(() => {
    onFetchPortfolioRadars();
    }, [onFetchPortfolioRadars]);

  console.log(radars);
  console.log(params);
  
  return (
    <MainLayout>
      <Container fluid>
      <PortfolioNavTemplate
        currency={"brl"}
      />
      <Row>
          <Col lg={12}>
            <Card>
              <h4 className="m-3">
                Meus Radars
              </h4>
              </Card>
          </Col>

          {radars.map((radar) => (
            <Col lg={3} key={radar.id}>
              <Card>
                <Card.Body>
                  <h6 className="m-3">
                    <a href={`/portfolio/${params.id}/radar/${radar.radar_id}`}>{radar.name} | {radar.portfolio}</a>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          ))} 
       </Row>
      </Container>
    </MainLayout>
  )
};

export default Radar;