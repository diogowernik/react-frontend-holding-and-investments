import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useKidProfile } from './contexts/KidProfileContext'; // Ajuste o caminho conforme necessário
import { FaUserEdit, FaPalette, FaStar, FaLock, FaFeatherAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
// kids nav
import KidsNav from './components/KidsNav/KidsNav';

import './ParentDashboard.css';
import './css/GlobalKids.css';

const ParentDashboard = () => {
    const history = useHistory();
    const kidProfile = useKidProfile(); // Usando o hook para obter o perfil da criança

    const navigateTo = (path) => {
        const slug = kidProfile.slug; // Obter o slug do perfil da criança
        history.push(`/kids/${slug}/parents${path}`); // Usar o slug na URL
    };

    // Definindo os botões e suas ações de navegação
    const parentButtons = [
        { id: 1, title: "Receita", icon: <FaPlusCircle />, action: () => navigateTo('/add-earnings') },
        { id: 2, title: "Despesa", icon: <FaMinusCircle />, action: () => navigateTo('/add-expenses') },
        { id: 3, title: "Missões", icon: <FaFeatherAlt />, action: () => navigateTo('/quests') },
        { id: 4, title: "Editar Perfil da Criança", icon: <FaUserEdit />, action: () => navigateTo('/edit-kid-profile') },
        

        { id: 5, title: "Customizar Tema", icon: <FaPalette />, action: () => navigateTo('/customization') },
        { id: 6, title: "Premium", icon: <FaStar />, action: () => navigateTo('/premium') },
        { id: 7, title: "Controle dos Pais", icon: <FaLock />, action: () => navigateTo('/parental-control') },
    
    ];

    return (
        <>
            <KidsNav />
            <Container className="kids-container parent-dashboard">
                <Alert variant="info" className="parent-dashboard-alert">
                    Bem-vindo ao painel de controle dos pais! Voce está no perfil de {kidProfile.name}.
                </Alert>
                <Row>
                    {parentButtons.map((button) => (
                        <Col xs={12} key={button.id} className="mb-1">
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
