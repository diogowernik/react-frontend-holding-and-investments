import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { FaPiggyBank } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { formatByMonth, getIconForCategory } from './utils/financialUtils';
import { fetchKidsEarns } from '../apis';

import './KidsEarns.css';
import './css/GlobalKids.css';


const KidsEarns = () => {
    const kidProfile = useKidProfile();
    const [earnings, setEarnings] = useState([]);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const json = await fetchKidsEarns(kidProfile.slug, kidProfile.token);
                if (json) {
                    setEarnings(json);
                    setShowLoadingScreen(false);
                }
            } catch (error) {
                console.error('Erro ao buscar ganhos:', error);
                // Adicione tratamento de erro ou notificação ao usuário aqui
                setShowLoadingScreen(false);
            }
        }

        if (kidProfile) {
            fetchEarnings();
        }
    } , [kidProfile]);

    const formattedEarnings = formatByMonth(earnings);

    if (showLoadingScreen || !kidProfile) {
        return <IconLoader Icon={FaPiggyBank} color="#6495ED" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container kids-earns">
                <ProfileHeader />
                <Alert variant="info" className="earnings-alert">
                    <p>
                        Aqui estão os seus ganhos. Você pode ver o que ganhou em cada mês e o que fez para ganhar.
                    </p>
                </Alert>
                {Object.keys(formattedEarnings).sort().map(month => (
                    <Row key={month}>
                        <Col>
                            <h3>{month}</h3>
                            <ListGroup>
                                {formattedEarnings[month].map(earn => (
                                    <ListGroup.Item key={earn.id} className="earn-item">
                                        <div className="earn-date">{earn.date}</div>
                                        <div className="earn-icon">{getIconForCategory(earn.category, 'earnings')}</div>
                                        <div className="earn-description">{earn.description}</div>
                                        <div className="earn-amount">R$ {earn.amount}</div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
};

export default KidsEarns;




