import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import KidsNav from '../../components/KidsNav/KidsNav';
import IconLoader from '../../components/IconLoader/IconLoader';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useKidProfile } from '../../contexts/KidProfileContext';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import QuestCard from '../../components/QuestCard/QuestCard';
import { fetchKidsProfileQuests } from '../../../apis'; // Atualize o caminho conforme necessário

import './KidsQuests.css';
import '../../css/GlobalKids.css';

const KidsQuests = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);    
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const json = await fetchKidsProfileQuests(kidProfile.slug, kidProfile.token);
                if (json) {
                    setQuests(json);
                    setShowLoadingScreen(false);
                }
            } catch (error) {
                console.error('Erro ao buscar quests:', error);
                // Adicione tratamento de erro ou notificação ao usuário aqui
                setShowLoadingScreen(false);
            }
        };

        if (kidProfile) {
            fetchQuests();
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
                <Alert variant="info" className="quests-alert">
                    <p>
                        Escolha uma aventura, para ganhar mais dinheirinho!
                    </p>
                </Alert>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <div className="action-message">
                            Escolha uma aventura!
                        </div>
                    </Col>
                </Row>
                <Row>
                    {quests.map(quest => (
                        <Col xs={12} className="mb-4" key={quest.quest_key}>
                            <QuestCard quest={quest} kidSlug={kidProfile.slug} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default KidsQuests;
