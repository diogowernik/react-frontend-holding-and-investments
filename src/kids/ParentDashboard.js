import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import IconLoader from './components/IconLoader/IconLoader';
import { useKidProfile } from './contexts/KidProfileContext';
import AuthContext from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { FaUserEdit, FaPalette, FaStar, FaLock, FaFeatherAlt, FaPlusCircle, FaMinusCircle, FaCogs } from 'react-icons/fa';
import KidsNav from './components/KidsNav/KidsNav';

import './ParentDashboard.css';
import './css/GlobalKids.css';

const ParentDashboard = () => {
    const history = useHistory();
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (kidProfile && auth.token) {
            setShowLoadingScreen(false);
        } else {
            setShowLoadingScreen(true);
        }
    }, [kidProfile, auth.token]);

    const navigateTo = (path) => {
        const slug = kidProfile.slug;
        history.push(`/kids/${slug}/config${path}`);
    };

    const parentButtons = [
        { id: 1, title: "Editar Perfil da Criança", icon: <FaUserEdit />, action: () => navigateTo('/edit-kid-profile') },
        { id: 2, title: "Receita", icon: <FaPlusCircle />, action: () => navigateTo('/add-earnings') },
        { id: 3, title: "Despesa", icon: <FaMinusCircle />, action: () => navigateTo('/add-expenses') },
        { id: 4, title: "Missões", icon: <FaFeatherAlt />, action: () => navigateTo('/quests') },
        
        { id: 5, title: "Customizar Tema", icon: <FaPalette />, action: () => navigateTo('/customization') },
        { id: 6, title: "Premium", icon: <FaStar />, action: () => navigateTo('/premium') },
        { id: 7, title: "Controle dos Pais", icon: <FaLock />, action: () => navigateTo('/parental-control') },
    ];

    if (showLoadingScreen || !kidProfile || !auth.token) {
        return <IconLoader Icon={FaCogs} color="#F2F2F2" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container parent-dashboard">
                <Alert variant="info" className="parent-dashboard-alert">
                    Bem-vindo ao painel de controle dos pais! Você está no perfil de {kidProfile.name}.
                </Alert>
                <Row>
                    {parentButtons.map((button) => (
                        <Col xs={12} key={button.id} className="mb-3">
                            <Card className="parent-dashboard-card" onClick={button.action}>
                                <Card.Body>
                                    <Card.Title className="card-title-flex">
                                        <span>{button.icon} {button.title}</span>
                                        <span className="arrow-right">{'>'}</span>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default ParentDashboard;
