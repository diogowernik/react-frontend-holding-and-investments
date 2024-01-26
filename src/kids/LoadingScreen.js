import React from 'react';
import { Container, Row} from 'react-bootstrap';
import './LoadingScreen.css';
import './GlobalKids.css';

const LoadingScreen = () => {
  return (
    <Container className="loading-screen">
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="bubbles" >
            {[...Array(6)].map((_, index) => (
              <div key={index} className={`bubble bubble-${index + 1}`}></div>
            ))}
        </div>
        <div className="text-center">
          <h1 className="loading-text animated-text">Meu <br/> Dinheirinho</h1>
        </div>
      </Row>
    </Container>
  );
};

export default LoadingScreen;
