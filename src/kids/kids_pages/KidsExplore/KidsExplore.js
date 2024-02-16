// KidsIntegration.js
import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import KidsNav from '../../components/KidsNav/KidsNav';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

import './KidsExplore.css'; // Certifique-se de ter um arquivo CSS separado ou reutilize KidsBanks.css se os estilos forem muito similares
import '../../css/GlobalKids.css';

const appOptions = [
  { name: 'Duolingo', logo: 'https://1000logos.net/wp-content/uploads/2020/10/Duolingo-logo.png', colSize: '4' },
  { name: 'Khan Academy', logo: 'https://1.bp.blogspot.com/-NbchJeIVlr8/YM-oYcz-3UI/AAAAAAAAPHs/YpSiueRxUBQUzzvpwTUB3sW54Zu8gco-gCLcBGAsYHQ/khan%2Bacademy%2BII.png', colSize: '4' },
  { name: 'Quizlet', logo: 'https://cdn.unasp.br/blog/wp-content/uploads/2019/07/maxresdefault-e1562792693998.jpg', colSize: '4' },
  { name: 'Scratch', logo: 'https://juniortech.org/wp-content/uploads/2020/09/Scratch-cat-logo-300x300px.png', colSize: '4' },
  { name: 'Mathletics', logo: 'https://gg4l.com/wp-content/uploads/images/catalog/mathletics.png', colSize: '4' },
  { name: 'ABC Mouse', logo: 'https://www.abcmouseaprendeingles.com.ve/f911439baebb7f2d64949b85a0496594.png', colSize: '4' },
];


const KidsIntegration = () => {
  return (
    <>
      <KidsNav />
      <Container className="kids-container kids-integration">
        <ProfileHeader />
        <Alert variant="info" className="text-center">
          Explore novas maneiras de aprender com essas incríveis plataformas!
        </Alert>
        <Row className="justify-content-md-center">
          {appOptions.map((option) => (
            <Col xs={option.colSize} key={option.name} className="mb-1">
              <Card className="integration-card">
                <Card.Body>
                  {/* <Card.Title className="text-center">{option.name}</Card.Title> */}
                  <div className="card-img-container">
                    <Card.Img variant="top" src={option.logo} alt={option.name} className="card-img-top" />
                  </div>
                  <Button variant="primary">Explorar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default KidsIntegration;
