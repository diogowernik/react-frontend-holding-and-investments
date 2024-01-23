import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaPiggyBank, FaChartLine, FaGift, FaQuestionCircle } from 'react-icons/fa';
import '../KidsDividends.css';

const KidsDividends = () => {
  // Dados de exemplo
  const investments = [
    { id: 1, image: 'images/HGLG11.jpeg', cotas: 10, fundo: 'HGLG11', dividends: 11.00, date: '15/02' },
    { id: 2, image: 'images/BRCO11.png', cotas: 12, fundo: 'BRCO11', dividends: 11.88, date: '15/02' },
    { id: 3, image: 'images/HGBS11.jpeg', cotas: 5, fundo: 'HGBS11', dividends: 10.00, date: '15/02' },
    { id: 4, image: 'images/KNRI11.png', cotas: 10, fundo: 'KNRI11', dividends: 10.00, date: '15/02' },
    { id: 5, image: 'images/HGCR11.png', cotas: 10, fundo: 'HGCR11', dividends: 10.00, date: '15/02' },
    { id: 6, image: 'images/HGRE11.png', cotas: 9, fundo: 'HGRE11', dividends: 10.80, date: '15/02' },
  ];

  const currentBalance = 325;
  const childName = "Bebel"; // Nome da criança

  // Calcular o total de dividendos para a próxima mesada
  const totalDividends = investments.reduce((sum, investment) => sum + investment.dividends, 0);

// ... (restante do código)

return (
  <>
  <Navbar bg="light" variant="light" className="justify-content-center custom-navbar" fixed="top">
    <Nav>
      <Nav.Link href="#home" className="nav-icon"><FaHome color="#F28D35" size={30} /></Nav.Link>
      <Nav.Link href="#investments" className="nav-icon"><FaPiggyBank color="#85BB65" size={30} /></Nav.Link>
      <Nav.Link href="#growth" className="nav-icon"><FaChartLine color="#6495ED" size={30} /></Nav.Link>
      <Nav.Link href="#rewards" className="nav-icon"><FaGift color="#FF69B4" size={30} /></Nav.Link>
      <Nav.Link href="#help" className="nav-icon"><FaQuestionCircle color="#FFD700" size={30} /></Nav.Link>
    </Nav>
  </Navbar>
  <Container className="kids-dividends">
    
    <Col xs={12} className="text-left welcome-message">
      <h2 className="child-name">Olá {childName},</h2>
    </Col>
    <Col xs={12} className="text-right current-balance-box">
      <p className="current-balance">Você juntou até agora <span className="balance-amount">R$ {currentBalance}</span></p>
    </Col>
    <Row>
    <Col xs={12} className="text-left investments-message">
      <p className="investments">Seus investimentos:</p>
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
          <p className='mt-2'>Sua mesada deste mês foi no dia <b>15 de fevereiro</b>, 
            <br/>
            você recebeu <span className="dividends-amount">R$ {totalDividends.toFixed(2)}</span></p>
        </Col>
      </Row>
  </Container>
  </>
);

};

export default KidsDividends;
