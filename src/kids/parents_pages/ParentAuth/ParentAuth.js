import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import KidsNav from '../../components/KidsNav/KidsNav';

import '../../css/GlobalKids.css';
import '../../ParentDashboard.css';
import './ParentAuth.css';

const ParentAuth = () => {
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();
    const { slug } = useParams();

    const correctPassword = "1234";

    const handleNumberClick = (number) => {
        setInputPassword((prev) => prev + number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputPassword === correctPassword) {
            history.push(`/kids/${slug}/config`);
        } else {
            setError(true);
            setInputPassword(''); // Limpar a senha inserida
            setTimeout(() => setError(false), 3000);
        }
    };

    const renderNumberButtons = () => {
        const numbers = [];
        for (let i = 1; i <= 9; i++) {
            numbers.push(
                <Col xs={4} key={i} className="mb-3">
                    <Button variant="secondary" className="parent-auth-number-button" onClick={() => handleNumberClick(i.toString())}>
                        {i}
                    </Button>
                </Col>
            );
        }
        return numbers;
    };

    return (
        <>
            <KidsNav />
            <Container className="parent-auth-container mt-4">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6} className="p-4">
                        {error && <Alert variant="danger" className="text-center">Senha incorreta</Alert>}
                        <Row>
                            {renderNumberButtons()}
                            <Col xs={12} key={0} className="mb-3 text-center">
                                <Button variant="secondary" className="parent-auth-number-button" onClick={() => handleNumberClick('0')}>
                                    0
                                </Button>
                            </Col>
                        </Row>
                        <div className="text-center float-right">
                            <Button variant="primary" type="button" className='parent-auth-confirm-button' onClick={handleSubmit}>
                                Confirmar
                            </Button>
                        </div>
                        {/* <div className='mt-3 text-center'>
                            <Button variant="light" className="parent-auth-clear-button" onClick={() => setInputPassword('')}>
                                Limpar
                            </Button>
                        </div> */}

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ParentAuth;
