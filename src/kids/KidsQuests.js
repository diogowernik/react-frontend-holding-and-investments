import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import KidsNav from './KidsNav';
import IconLoader from './IconLoader';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import ProfileHeader from './ProfileHeader';
import QuestCard from './QuestCard';

import './KidsQuests.css';
import './GlobalKids.css';


const KidsQuests = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);    
    const quests = [
        // { questKey: 'quest1', title: "Aventura Matemática", description: "Ganhe recompensas resolvendo divertidos desafios matemáticos!", reward: 5, image: '../../images/math-adventure.png' },
        { questKey: 'quest2', title: "Missão Ecológica", description: "Explore a natureza e aprenda sobre horta.", reward: 3, image: '../../images/eco-mission.png' },
        { questKey: 'quest3', title: "Missão Espuma Divertida", description: "Divirta-se lavando o carro e ganhe!", reward: 4, image: '../../images/car-wash.png' },
        // { questKey: 'quest4', title: "Aventura das Palavras", description: "Leia um capítulo e embarque em uma jornada de conhecimento!", reward: 3, image: '../../images/reading-adventure.png' },
        { questKey: 'quest5', title: "Tesouro Escondido", description: "Venda itens antigos em uma garage sale!", reward: 3, image: '../../images/garage-sale.png' },
        // Adicione outras quests aqui...
    ];
    
    useEffect(() => {
        if (kidProfile) {
            setTimeout(() => setShowLoadingScreen(false), 2000);
        }
    }, [kidProfile]);

    if (showLoadingScreen || !kidProfile) {
        return <IconLoader Icon={FaMoneyBillWave} color="#85BB65" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container kids-quests">
                <ProfileHeader />
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <div className="action-message">
                            Escolha uma aventura!
                        </div>
                    </Col>
                </Row>
                <Row>
                    {quests.map(quest => (
                        <Col xs={12} className="mb-4" key={quest.questKey}>
                            <QuestCard quest={quest} kidSlug={kidProfile.slug} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};


export default KidsQuests;
