import React from 'react';
import { useParams } from 'react-router-dom';
import './QuestDetails.css'; // Adicione o caminho correto para o seu arquivo CSS
import KidsNav from './KidsNav'; // Importe o componente KidsNav
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
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
        missionDetails: "Plante 20 mudinhas no canteiro da horta",
        reward: 10,
        image: "../../../images/eco-mission.png"
    },
    // Adicione mais quests conforme necessário...
};

// Função para obter os detalhes de uma quest específica
function getQuestDetails(questKey) {
    return questData[questKey] || null;
}

const QuestDetails = () => {
    const { questKey } = useParams();
    const questDetails = getQuestDetails(questKey);

    const childName = "Bebel"; // Nome da criança
    const currentBalance = 264.02; // Saldo atual da criança

    if (!questDetails) {
        return <div className="quest-not-found">Quest não encontrada.</div>;
    }
    
        return (
            <>
                <KidsNav />
                <Container className="quest-details-container">
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
                                <strong>Recompensa:</strong> R$ 10
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
