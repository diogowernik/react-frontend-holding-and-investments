import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { useKidProfile } from './contexts/KidProfileContext'; // Importe o hook
import { dashboardButtons } from './dashboardButtons'; 
import ProfileHeader from './ProfileHeader'; 

import './KidsDashboard.css';
import './GlobalKids.css';

const KidsDashboard = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
        if (kidProfile) {
            setTimeout(() => setShowLoadingScreen(false), 2000);
        }
    }, [kidProfile]);

    if (showLoadingScreen || !kidProfile) {
        return <LoadingScreen />;
    }

    const basePath = `/kids/${kidProfile.slug}`;

    return (
        <Container className="kids-container dashboard">
            <ProfileHeader />
            <Row className="justify-content-md-center">
                <Col xs={12}>
                    <div className="action-message">
                        Escolha um botão :)
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {dashboardButtons.map(button => (
                    <Col key={button.id} xs={4} className="dashboard-item">
                        {button.isActive ? (
                            <Link to={`${basePath}/${button.text.toLowerCase()}`}>
                                <Button variant="light" className="icon-button">
                                    <button.Icon color={button.color} size={50} />
                                </Button>
                            </Link>
                        ) : (
                            <div className="icon-button disabled">
                                <button.Icon color={button.color} size={50} />
                            </div>
                        )}
                        <h3 className={button.isActive ? "" : "text-muted"}>{button.text}</h3>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}


export default KidsDashboard;


