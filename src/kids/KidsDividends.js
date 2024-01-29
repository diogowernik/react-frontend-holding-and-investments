import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import KidsNav from './KidsNav';
import IconLoader from './IconLoader';
import { FaCoins } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import ProfileHeader from './ProfileHeader';

import './KidsDividends.css'; 
import './GlobalKids.css';


const KidsDividends = () => {
  // Dados de exemplo
  const investments = [
    { id: 1, image: '../../images/HGLG11.jpeg', cotas: 10, fundo: 'HGLG11', dividends: 11.00, date: '15/02' },
    { id: 2, image: '../../images/BRCO11.png', cotas: 12, fundo: 'BRCO11', dividends: 11.88, date: '15/02' },
    { id: 3, image: '../../images/HGBS11.jpeg', cotas: 5, fundo: 'HGBS11', dividends: 10.00, date: '15/02' },
    { id: 4, image: '../../images/KNRI11.png', cotas: 10, fundo: 'KNRI11', dividends: 10.00, date: '15/02' },
    { id: 5, image: '../../images/HGCR11.png', cotas: 10, fundo: 'HGCR11', dividends: 10.00, date: '15/02' },
    { id: 6, image: '../../images/HGRE11.png', cotas: 9, fundo: 'HGRE11', dividends: 10.80, date: '15/02' },
  ];

  const kidProfile = useKidProfile();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Calcular o total de dividendos para a próxima mesada
  const totalDividends = investments.reduce((sum, investment) => sum + investment.dividends, 0);

  useEffect(() => {
    if (kidProfile) {
      setTimeout(() => setShowLoadingScreen(false), 2000);
    }
  }, [kidProfile]);

  if (showLoadingScreen || !kidProfile) {
    return <IconLoader Icon={FaCoins} color="#FFD700" />;
  }

  return (
    <>
      <KidsNav />
      <Container className="kids-container kids-dividends">
        <ProfileHeader />
      <Row>
        <Col xs={12} className="text-left investments-message">
          <p className="investments">Sua Mesada:</p>
        </Col>
      </Row>
    <Row>
      {/* Seus investimentos: */}
      {investments.map((investment) => (
        <Col xs={4} key={investment.id} className="investment-col"> {/* Mantendo 3 colunas em dispositivos móveis */}
          <Card className="investment-card">
            <Card.Header>{investment.cotas} cotas</Card.Header>
            <Card.Img variant="top" src={investment.image} className="investment-image" />
            <Card.Body>
              <Card.Title> R$ {(investment.dividends).toFixed(2)}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <Row>
          <Col xs={12} className="text-center next-allowance">
            <p className='mt-2'>
              Somando os alugueis dos seus investimentos,
              <br/>
              você recebeu <span className="dividends-amount">R$ {totalDividends.toFixed(2)}</span> de mesada.
            </p>
          </Col>
        </Row>
  </Container>
  </>
);

};

export default KidsDividends;
