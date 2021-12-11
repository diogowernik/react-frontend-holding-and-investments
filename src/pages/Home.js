import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Home = () => (
  <MainLayout>
    <Jumbotron className="bg-light">
      <Container>
        <Row>
          <Col md={6} className="my-auto">
            <h1><b>Minha Holding</b></h1>
            <h5 className="mt-4 mb-4">
              Uma forma inteligente de gerenciar seus investimentos e tomar decisões
            </h5>
            <br/>
            <Button href="/portfolios" variant="standard" size="lg">
              Gerenciar seus Investimentos
            </Button>
          </Col>
          <Col md={6}>
            <Image src="https://assets.materialup.com/uploads/07425fae-0559-42d9-ad91-29a914fcbfb9/preview.gif" rounded fluid />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </MainLayout>
);

export default Home;