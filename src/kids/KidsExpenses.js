import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { useKidProfile } from './contexts/KidProfileContext';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { formatByMonth, getIconForCategory } from './utils/financialUtils';
import { FaShoppingCart} from 'react-icons/fa';

import './KidsExpenses.css';
import './css/GlobalKids.css';

// Dados de exemplo para despesas
const kidsExpenses = [
    { id: 1, date: '27/01/2024', category: 'doces', description: 'docinhos pier 21', amount: 48.50 },
    // { id: 2, date: '10/04/2023', category: 'brinquedo', description: 'Jogo de tabuleiro', amount: 45.00 },
    // { id: 3, date: '15/04/2023', category: 'doces', description: 'Caixa de chocolates', amount: 25.90 },
    // { id: 4, date: '20/04/2023', category: 'comida', description: 'Ingresso de cinema com combo de pipoca', amount: 30.00 },
    // { id: 5, date: '25/04/2023', category: 'outros', description: 'Camiseta nova', amount: 40.00 },
    // { id: 6, date: '03/05/2023', category: 'comida', description: 'Pizza com amigos', amount: 50.00 },
    // { id: 7, date: '08/05/2023', category: 'brinquedo', description: 'Jogo digital para console', amount: 120.00 },
    // { id: 8, date: '13/05/2023', category: 'outros', description: 'Material de artes', amount: 35.00 },
    // { id: 9, date: '18/05/2023', category: 'comida', description: 'Lanche no parque', amount: 20.00 }
];

const KidsExpenses = () => {
    const kidProfile = useKidProfile();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    const formattedExpenses = formatByMonth(kidsExpenses, 'expenses');

    useEffect(() => {
        if (kidProfile) {
            setTimeout(() => setShowLoadingScreen(false), 2000);
        }
    }, [kidProfile]);

    if (showLoadingScreen || !kidProfile) {
        return <IconLoader Icon={FaShoppingCart} color="#e7ab3c" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container kids-expenses">
                <ProfileHeader />
                <Alert variant="info" className="expenses-alert">
                    <p>
                        Aqui estão os seus gastos. Você pode ver o que gastou em cada mês e o que comprou.
                    </p>
                </Alert>
                {Object.keys(formattedExpenses).sort().reverse().map(month => (
                    <Row key={month}>
                        <Col>
                            <h3>{month}</h3>
                            <ListGroup>
                                {formattedExpenses[month].map(expense => (
                                    <ListGroup.Item key={expense.id} className="expense-item">
                                        <div className="expense-date">{expense.date}</div>
                                        <div className="expense-icon">{getIconForCategory(expense.category, 'expenses')}</div>
                                        <div className="expense-description">{expense.description}</div>
                                        <div className="expense-amount">R${expense.amount.toFixed(2)}</div>
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

export default KidsExpenses;
