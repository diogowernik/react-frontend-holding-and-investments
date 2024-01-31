import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import { FaCoins } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { fetchKidsProfileDividends } from '../apis'; // Certifique-se de que o caminho está correto
import { useHistory } from 'react-router-dom';


import './KidsDividends.css'; 
import './css/GlobalKids.css';

const KidsDividends = () => {
  const kidProfile = useKidProfile();
  const history = useHistory();
  const [investments, setInvestments] = useState([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  
  const getCurrentMonthDividends = (investments) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Janeiro é 0, então adicione 1

    return investments.filter(investment => {
        const [, month, year] = investment.pay_date.split('/').map(Number);
        return year === currentYear && month === currentMonth;
    });
};

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        const json = await fetchKidsProfileDividends(kidProfile.slug, kidProfile.token);
        if (json) {
          const monthlyDividends = getCurrentMonthDividends(json);
          setInvestments(monthlyDividends);
      }
      } catch (error) {
        console.error('Erro ao buscar dados de dividendos:', error);
        // Tratamento de erro ou notificação ao usuário aqui
      } finally {
        setShowLoadingScreen(false);
      }
    };

    if (kidProfile) {
      fetchDividends();
    }
  }, [kidProfile]);

  console.log(investments)

  const totalDividends = investments.reduce((sum, investment) => sum + investment.total_dividend_brl, 0);

  if (showLoadingScreen || !kidProfile) {
    return <IconLoader Icon={FaCoins} color="#FFD700" />;
  }

  return (
    <>
      <KidsNav />
      <Container className="kids-container kids-dividends">
        <ProfileHeader />
        <Row>
          <Col xs={12} className="text-center investments-message">
            <p className="investments">Sua Mesada:</p>
          </Col>
        </Row>
        <Row>
          {investments.map((investment) => (
            <Col xs={4} key={investment.id} className="investment-col">
              <Card className="investment-card">
                <Card.Header>{investment.shares_amount} cotas</Card.Header>
                <Card.Img variant="top" src={`../../images/${investment.ticker}.png`} className="investment-image" />
                <Card.Body>
                  <Card.Title> R$ {(investment.total_dividend_brl.toFixed(2))} </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={12} className="text-center next-allowance">
          <p className='mt-2'>
                      Somando os alugueis dos investimentos,
                      <br/>
                      Sua mesada deste mês é: <span className="dividends-amount">R$ {totalDividends.toFixed(2)}</span>.
                  </p>
                  <Button 
                      variant="success" 
                      className="missions-button" 
                      onClick={() => history.push(`/kids/${kidProfile.slug}/ganhar`)}>
                      Faça uma missão para <br/>
                      ganhar mais!
                  </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default KidsDividends;
