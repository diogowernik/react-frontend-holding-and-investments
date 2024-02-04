import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBrain, FaPuzzlePiece, FaQuestionCircle, FaAward } from 'react-icons/fa';
import KidsNav from './components/KidsNav/KidsNav';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

import './KidsGames.css';
import './css/GlobalKids.css';

const gamesList = [
  { name: 'Desafio de Matemática', icon: <FaBrain />, description: 'Teste suas habilidades matemáticas e torne-se um campeão dos números!' },
  { name: 'Quebra-cabeça do Mundo Animal', icon: <FaPuzzlePiece />, description: 'Monte quebra-cabeças e aprenda sobre diferentes animais.' },
  { name: 'Quiz de Ciências', icon: <FaQuestionCircle />, description: 'Desafie seu conhecimento sobre o mundo natural e o universo.' },
  { name: 'Conquista de Leitura', icon: <FaAward />, description: 'Leia livros e ganhe prêmios por cada história completada!' }
  // Adicione mais jogos conforme necessário
];

const KidsGames = () => {
  return (
    <>
      <KidsNav />
      <Container className="kids-container kids-games">
        <ProfileHeader />
        <Row className="justify-content-md-center">
          {gamesList.map((game) => (
            <Col xs={12} md={6} lg={4} key={game.name} className="mb-4">
              <Card className="game-card">
                <Card.Body>
                  <Card.Title className="text-center">{game.icon} {game.name}</Card.Title>
                  <Card.Text>{game.description}</Card.Text>
                  <Button variant="primary">Participar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default KidsGames;
