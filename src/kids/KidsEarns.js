import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaGift, FaBuilding, FaStar, FaPiggyBank } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

import './KidsEarns.css';
import './css/GlobalKids.css';

// Dados de exemplo
const kidsEarnings = [
    { id: 1, date: '13/05/2023', category: 'presente', description: 'Presente do vovô', amount: 400.00 },
    { id: 2, date: '15/05/2023', category: 'aluguel', description: 'Aluguéis de Fiis', amount: 60.56 },
    { id: 3, date: '18/05/2023', category: 'missao', description: 'Missão Espuma Divertida', amount: 40.00 },
    { id: 4, date: '21/05/2023', category: 'presente', description: 'Presente da tia', amount: 150.00 },
    { id: 5, date: '25/05/2023', category: 'aluguel', description: 'Rendimentos de investimentos', amount: 75.20 },
    { id: 6, date: '28/05/2023', category: 'missao', description: 'Jardinagem no fim de semana', amount: 30.00 },
    { id: 7, date: '02/06/2023', category: 'presente', description: 'Dinheiro de mesada', amount: 100.00 },
    { id: 8, date: '05/06/2023', category: 'missao', description: 'Limpeza do quarto', amount: 25.00 }
];

const getIconForCategory = (category) => {
    switch (category) {
        case 'presente':
            return <FaGift style={{ color: '#FFD700' }} />; // Cor dourada para presentes
        case 'aluguel':
            return <FaBuilding style={{ color: '#85BB65' }} />; // Cor verde para aluguéis
        case 'missao':
            return <FaStar style={{ color: '#6495ED' }} />; // Cor azul para missões
        default:
            return <FaStar style={{ color: '#CCCCCC' }} />; // Cor cinza para ícone padrão
    }
};

    // Definir monthNames no escopo do componente para que possa ser usado em ambas as funções
    const monthNames = {
        '01': 'Janeiro', '02': 'Fevereiro', '03': 'Março',
        '04': 'Abril', '05': 'Maio', '06': 'Junho',
        '07': 'Julho', '08': 'Agosto', '09': 'Setembro',
        '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
    };

    // Função para formatar os ganhos por mês e converter as datas
    const formatEarningsByMonth = (earnings) => {
        return earnings.reduce((acc, earn) => {
            const [day, month] = earn.date.split('/');
            const formattedMonth = monthNames[month];
            if (!acc[formattedMonth]) {
                acc[formattedMonth] = [];
            }
            acc[formattedMonth].push({
                ...earn,
                date: `${day}/${month}` // Converte a data para dd/mm
            });
            return acc;
        }, {});
    };

const KidsEarns = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    const formattedEarnings = formatEarningsByMonth(kidsEarnings);

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
                {Object.keys(formattedEarnings).sort().reverse().map(month => (
                    <Row key={month}>
                        <Col>
                            <h3>{month}</h3>
                            <ListGroup>
                                {formattedEarnings[month].map(earn => (
                                    <ListGroup.Item key={earn.id} className="earn-item">
                                        <div className="earn-date">{earn.date}</div>
                                        <div className="earn-icon">{getIconForCategory(earn.category)}</div>
                                        <div className="earn-description">{earn.description}</div>
                                        <div className="earn-amount">{earn.amount.toFixed(2)}</div>
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
