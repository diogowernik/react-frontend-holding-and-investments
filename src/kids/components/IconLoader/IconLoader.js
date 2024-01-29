// IconLoader.js
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './IconLoader.css'; // Certifique-se de ter este arquivo CSS para estilização

const IconLoader = ({ Icon, color }) => {    
    return (
        <Container className="kids-container loading-screen">
            <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Icon className="loading-icon" style={{ color: color, fontSize: '60px' }} />
            </Row>
        </Container>
    );
};

export default IconLoader;