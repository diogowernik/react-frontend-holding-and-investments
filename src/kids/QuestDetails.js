import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import KidsNav from './KidsNav';
import { useKidProfile } from './contexts/KidProfileContext';
import ProfileHeader from './ProfileHeader';

import './QuestDetails.css';
import './GlobalKids.css';


// Dados de exemplo para as quests
const questData = {
    'quest1': {
        title: "Aventura Matemática",
        story: "Resolva enigmas matemáticos e ganhe pontos!",
        mission: "Classe Numeric.",
        missionDetails: "Jogue o Classe Numeric e acumule 100 pontos",
        reward: 10,
        image: "../../../images/math-adventure.png"
    },
    'quest2': {
        title: "Missão Ecológica",
        story: "Explore a natureza e aprenda sobre horta.",
        mission: "Ajude a Plantar.",
        missionDetails: "Plante bandejas de mudinhas no canteiro da horta",
        reward: 10,
        image: "../../../images/eco-mission.png"
    },
    'quest3': {
        title: "Missão Espuma Divertida",
        story: "Ajude a manter tudo limpo e brilhante!",
        mission: "Lave o carro",
        missionDetails: "Lave o carro por dentro e por fora, bem limpinho",
        reward: 40,
        image: "../../../images/car-wash.png"
    },
    'quest4': {
        title: "Aventura das Palavras",
        story: "Embarque em aventuras incríveis com cada página!",
        mission: "Maratona de Leitura",
        missionDetails: "Leia um capítulo do livro 'As Aventuras do Mundo das Letras'",
        reward: 7,
        image: "../../../images/reading-adventure.png"
    },
    'quest5': {
        title: "Tesouro Escondido",
        story: "Descubra e compartilhe tesouros do passado!",
        mission: "Garage Sale",
        missionDetails: "Organize uma venda de garagem com itens que você não usa mais",
        reward: "o lucro da venda",
        image: "../../../images/garage-sale.png"
    },
    // Adicione mais quests conforme necessário...
};


// Função para obter os detalhes de uma quest específica
function getQuestDetails(questKey) {
    return questData[questKey] || null;
}

const QuestDetails = () => {
    const { questKey } = useParams();
    const kidProfile = useKidProfile();
    const questDetails = getQuestDetails(questKey);

    if (!kidProfile || !questDetails) {
        return <div>Carregando...</div>; // ou um componente de carregamento
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
                                <strong>Instruções:</strong> {questDetails.missionDetails} para ganhar {questDetails.reward} reais.
                            </Card.Text>
                            {/* Adicione mais elementos conforme necessário */}
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
};

export default QuestDetails;
