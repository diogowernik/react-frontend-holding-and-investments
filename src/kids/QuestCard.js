import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestCard = ({ quest, kidSlug }) => {
    return (
        <Card className="quest-card">
            <Card.Img variant="top" src={quest.image} />
            <Card.Body>
                <Card.Title>{quest.title}</Card.Title>
                <Card.Text>{quest.description}</Card.Text>
                <Link to={`/kids/${kidSlug}/ganhar/${quest.questKey}`}>
                    <Button variant="primary">Começar Aventura</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default QuestCard;
