import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { FaPiggyBank } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { formatByMonth, getIconForCategory } from './utils/financialUtils';

import './KidsEarns.css';
import './css/GlobalKids.css';

// Dados de exemplo
const kidsEarnings = [
    // { id: 1, date: '13/05/2023', category: 'presente', description: 'Presente do vovô', amount: 400.00 },
    { id: 2, date: '01/02/2024', category: 'missao', description: 'Missão Espuma Divertida', amount: 44.00 },
    { id: 3, date: '15/01/2024', category: 'aluguel', description: 'Aluguéis de Fiis', amount: 60.56 },
    // { id: 4, date: '21/05/2023', category: 'presente', description: 'Presente da tia', amount: 150.00 },
    // { id: 5, date: '25/05/2023', category: 'aluguel', description: 'Rendimentos de investimentos', amount: 75.20 },
    // { id: 6, date: '28/05/2023', category: 'missao', description: 'Jardinagem no fim de semana', amount: 30.00 },
    // { id: 7, date: '02/06/2023', category: 'presente', description: 'Dinheiro de mesada', amount: 100.00 },
    // { id: 8, date: '05/06/2023', category: 'missao', description: 'Limpeza do quarto', amount: 25.00 }
];

const KidsEarns = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    // Utilizando a função formatByMonth para organizar os dados por mês
    const formattedEarnings = formatByMonth(kidsEarnings);

    useEffect(() => {
        if (kidProfile) {
            setTimeout(() => setShowLoadingScreen(false), 2000);
        }
    }, [kidProfile]);

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
                                        <div className="earn-amount">R$ {earn.amount.toFixed(2)}</div>
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




