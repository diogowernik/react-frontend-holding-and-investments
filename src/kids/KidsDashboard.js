import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPiggyBank, FaCoins, FaShoppingCart, FaGamepad, FaBullseye, FaBook, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import LoadingScreen from './LoadingScreen';

import './KidsDashboard.css';

const KidsDashboard = () => {
        const childName = "Bebel"; // Nome da criança
        const currentBalance = 264.02; // Saldo atual da criança
        const basePath = '/kids/isabel';

        const dashboardButtons = [
            { id: 3, Icon: FaCoins, color: "#FFD700", text: "Mesadinha" },
            { id: 2, Icon: FaMoneyBillWave, color: "#85BB65", text: "Ganhar" },
            // Desativar esses botões por enquanto (não temos as telas), mas o icone aparecer meio apagado
            { id: 1, Icon: FaPiggyBank, color: "#6495ED", text: "Guardar" },
            { id: 4, Icon: FaShoppingCart, color: "#FF6B6B", text: "Lojinha" },
            { id: 5, Icon: FaGamepad, color: "#F6D365", text: "Desafios" },
            { id: 6, Icon: FaBook, color: "#FF9A9E", text: "Extrato" },
            { id: 7, Icon: FaBullseye, color: "#F0E6A7", text: "Metas" },
            { id: 8, Icon: FaBook, color: "#C3AED6", text: "Educação" },
            { id: 9, Icon: FaChartLine, color: "#7fdbda", text: "Crescimento" },
        ];

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
            <Container className="dashboard">
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
                            Escolha um botão :)
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {dashboardButtons.map(button => (
                        <Col key={button.id} xs={4} className="dashboard-item">
                            <Link to={`${basePath}/${button.text.toLowerCase()}`}>
                                <Button variant="light" className="icon-button">
                                    <button.Icon color={button.color} size={50} />
                                </Button>
                            </Link>
                            <h3>{button.text}</h3>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }


export default KidsDashboard;
