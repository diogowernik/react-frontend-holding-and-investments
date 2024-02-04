import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import KidsNav from './components/KidsNav/KidsNav';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

// Importe seu CSS
import './KidsEvents.css';
import './css/GlobalKids.css';

const monthsWithEvents = {
    "Janeiro": [],
    "Fevereiro": [],
    "Março": [],
    "Abril": [],
    "Maio": ["Niver"],
    "Junho": [],
    "Julho": [],
    "Agosto": ["Dia das Crianças"],
    "Setembro": [],
    "Outubro": [],
    "Novembro": [],
    "Dezembro": ["Natal"]
};

const KidsEvents = () => {
    return (
        <>
            <KidsNav />
            <ProfileHeader />
            <Container className="kids-container kids-events">
                <Row>
                    {Object.entries(monthsWithEvents).map(([month, events], index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="month-col">
                            <div className="month-name">{month}</div>
                            <ul className="events-list">
                                {events.map((event, index) => (
                                    <li key={index} className="event-item">{event}</li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default KidsEvents;
