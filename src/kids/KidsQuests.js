import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import KidsNav from './KidsNav'; // Importe o componente KidsNav
import IconLoader from './IconLoader';
import './KidsQuests.css'; // Importe o arquivo CSS
import './GlobalKids.css';
import { FaMoneyBillWave } from 'react-icons/fa';


const QuestCard = ({ quest }) => {
    return (
        <Card className="quest-card">
            <Card.Img variant="top" src={quest.image} />
            <Card.Body>
                <Card.Title>{quest.title}</Card.Title>
                <Card.Text>{quest.description}</Card.Text>
                <Link to={`/kids/isabel/ganhar/${quest.questKey}`}>
                    <Button variant="primary">Começar Aventura</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


const KidsQuests = () => {
    const quests = [
        { questKey: 'quest1', title: "Aventura Matemática", description: "Ganhe recompensas resolvendo divertidos desafios matemáticos!", reward: 5, image: '../../images/math-adventure.png' },
        { questKey: 'quest2', title: "Missão Ecológica", description: "Explore a natureza e aprenda sobre horta.", reward: 3, image: '../../images/eco-mission.png' },
        // Adicione outras quests aqui...
    ];
    const childName = "Bebel"; // Nome da criança
    const currentBalance = 264.02; // Saldo atual da criança

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 2000); // Exibe a tela de carregamento por 3 segundos
  
      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }, []);
  
    if (showLoadingScreen) {
      return <IconLoader 
                Icon={FaMoneyBillWave} 
                color="#85BB65"
             />;
  }

    return (
        <>
            <KidsNav />
            <Container className="kids-quests">
            <Row className="justify-content-md-center">
                    <Col xs={12}>
                        <div className="welcome-message">
                            Oi {childName},
                        </div>
                        <div className="current-balance">
                            Você tem R$ {currentBalance.toFixed(2)}
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12}>
                        <div className="action-message">
                            Escolha uma aventura!
                        </div>
                    </Col>
                </Row>
                <Row>
                    {quests.map(quest => (
                        <Col xs={12} md={6} lg={4} className="mb-4" key={quest.questKey}>
                            <QuestCard quest={quest} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};


export default KidsQuests;
