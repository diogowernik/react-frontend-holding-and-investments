import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';
import './KidsDividends.css'; 
import KidsNav from './KidsNav'; 


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

  const currentBalance = 264.02;
  const childName = "Bebel"; // Nome da criança

  // Calcular o total de dividendos para a próxima mesada
  const totalDividends = investments.reduce((sum, investment) => sum + investment.dividends, 0);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 3000); // Exibe a tela de carregamento por 3 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }


return (
  <>
  <KidsNav />
  <Container className="kids-dividends">
    
    <Col xs={12} className="text-left welcome-message">
      <h2 className="child-name">Oi {childName},</h2>
    </Col>
    <Col xs={12} className="text-right current-balance-box">
      <p className="current-balance">Você tem <span className="balance-amount">R$ {currentBalance}</span></p>
    </Col>
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
