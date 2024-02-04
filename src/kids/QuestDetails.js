import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import KidsNav from './components/KidsNav/KidsNav';
import { useKidProfile } from './contexts/KidProfileContext';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import IconLoader from './components/IconLoader/IconLoader'; // Se você tiver um componente de carregamento
import { fetchKQuest } from '../apis'; // Certifique-se de que o caminho está correto

import './QuestDetails.css';
import './css/GlobalKids.css';

const QuestDetails = () => {
    const { questKey } = useParams();
    const kidProfile = useKidProfile();
    const [questDetails, setQuestDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestDetails = async () => {
            try {
                const json = await fetchKQuest(kidProfile.slug, questKey, kidProfile.token);
                if (json) {
                    setQuestDetails(json);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes da quest:', error);
                // Tratamento de erro ou notificação ao usuário aqui
            } finally {
                setIsLoading(false);
            }
        };

        if (kidProfile) {
            fetchQuestDetails();
        }
    }, [kidProfile, questKey]);

    if (isLoading || !questDetails) {
        return <IconLoader Icon={FaCoins} color="#85BB65" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container quest-details-container">
                <ProfileHeader />
                <Card className="quest-card">
                    <Card.Header as="h2" className="quest-title text-center">{questDetails.title}</Card.Header>
                    <Card.Img variant="top" src={questDetails.image} alt={questDetails.title} className="quest-image" />
                    <Card.Body>
                        <Card.Text className="quest-story text-right">
                            {questDetails.story}
                        </Card.Text>
                        <Card.Text className="quest-mission">
                            <strong>Missão:</strong> {questDetails.mission}
                        </Card.Text>
                        <div className="quest-reward">
                            <FaCoins className="coins-icon" />
                            <strong>Recompensa:</strong> {questDetails.reward}
                        </div>
                        <Card.Text className="quest-instructions">
                            <strong>Instruções:</strong> {questDetails.mission_details} para ganhar {questDetails.reward} reais.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default QuestDetails;
