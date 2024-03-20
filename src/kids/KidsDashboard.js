// KidsDasboard.js

import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { useKidProfile } from './contexts/KidProfileContext';
import AuthContext from '../contexts/AuthContext';

import { Link } from 'react-router-dom';
import { updatedDashboard } from './utils/dashboardButtons'; 
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

import './KidsDashboard.css';
import './css/GlobalKids.css';

const KidsDashboard = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [buttons, setButtons] = useState([]); // Inicializado como um array vazio

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchAndUpdateButtons = async () => {
            if (kidProfile) {
                const updatedButtons = await updatedDashboard(kidProfile.slug, auth.token);
                setButtons(updatedButtons); // Atualiza os botões com as configurações do backend
                setShowLoadingScreen(false); // Esconde o loading screen após a atualização
            }
        };
    
        fetchAndUpdateButtons();
    }, [kidProfile, auth.token]); // Dependências atualizadas para incluir auth.token
    

    if (showLoadingScreen || !kidProfile) {
        return <LoadingScreen />;
    }

    const basePath = `/kids/${kidProfile.slug}`;

    return (
        <Container className="kids-container dashboard">
            <ProfileHeader />
            <Row className="justify-content-md-center">
                <Col xs={12}>
                    <div className="action-message">
                        Escolha um botão :)
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {buttons.filter(button => button.isVisible).map((button) => (
                    <Col key={button.id} xs={4} className="dashboard-item">
                        {button.isActive ? (
                            <Link to={`${basePath}${button.link}`}> {/* Alterado para usar button.link */}
                                <Button variant="light" className="icon-button">
                                    <button.Icon color={button.color} size={50} />
                                </Button>
                            </Link>
                        ) : (
                            <div className="icon-button disabled">
                                <button.Icon color={button.color} size={50} />
                            </div>
                        )}
                        <h3 className={button.isActive ? "" : "text-muted"}>{button.text}</h3>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default KidsDashboard;
