import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useKidProfile } from './contexts/KidProfileContext';

const ProfileHeader = () => {
    const kidProfile = useKidProfile();

    if (!kidProfile) {
        return <p>Carregando...</p>; // Ou um componente de carregamento
    }

    return (
        <Row className="justify-content-md-center">
            <Col xs={12}>
                <div className="welcome-message">
                    Oi {kidProfile.name},
                </div>
                <div className="current-balance">
                    Você tem R$ {kidProfile.current_balance.toFixed(2)}
                </div>
            </Col>
        </Row>
    );
};

export default ProfileHeader;
