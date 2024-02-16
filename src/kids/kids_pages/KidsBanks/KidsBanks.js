import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import KidsNav from '../../components/KidsNav/KidsNav';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

import './KidsBanks.css';
import '../../css/GlobalKids.css';

const bankOptions = [
  { name: 'Inter Kids',  logo: 'https://s3.amazonaws.com/marketplace.comparaonline.com/marketplace/logos/divisions/banco-inter-conta-kids.png', colSize: '6' },
  { name: 'C6 Yellow',  logo: 'https://play-lh.googleusercontent.com/1MlQMp17XNv3wrEu-dWTbQbRKPiOShYQ3OGWQTTJvUTcbf7zZ07IO4Hdmaq-KW_DTf0=w240-h480-rw', colSize: '6' },
  { name: 'XP Kids', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/bb3114113799515.602eccdaba9d1.png', colSize: '6' },
  { name: 'Nubank', logo: 'https://www.idinheiro.com.br/wp-content/uploads/2021/03/Nubank-Logomarca.png', colSize: '6' },
];

const KidsBanks = () => {
  return (
    <>
      <KidsNav />
      <Container className="kids-container kids-bank-integration">
        <ProfileHeader />
        <Alert variant="warning" className="text-center">
          Chame seus pais para te ajudar com essa parte!
        </Alert>
        <Row className="justify-content-md-center">
          {bankOptions.map((option) => (
            <Col xs={option.colSize} key={option.name} className="mb-1">
              <Card className="bank-integration-card">
              <Card.Body>
                <Card.Title className="text-center">{option.name}</Card.Title>
                <div className="card-img-container"> {/* Adiciona o contêiner da imagem */}
                  <Card.Img variant="top" src={option.logo} alt={option.name} className="card-img-top" />
                </div>
                <Button variant="success">Conecte-se</Button>
              </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default KidsBanks;
