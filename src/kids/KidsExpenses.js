import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useKidProfile } from './contexts/KidProfileContext';
import KidsNav from './components/KidsNav/KidsNav';
import IconLoader from './components/IconLoader/IconLoader';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { formatByMonth, getIconForCategory } from './utils/financialUtils';
import { fetchKidsExpenses } from '../apis';

import './KidsExpenses.css';
import './css/GlobalKids.css';

const KidsExpenses = () => {
    const kidProfile = useKidProfile();
    const [expenses, setExpenses] = useState([]);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const json = await fetchKidsExpenses(kidProfile.slug, kidProfile.token);
                if (json) {
                    setExpenses(json);
                    setShowLoadingScreen(false);
                }
            } catch (error) {
                console.error('Erro ao buscar despesas:', error);
                // Adicione tratamento de erro ou notificação ao usuário aqui
                setShowLoadingScreen(false);
            }
        }
        if (kidProfile) {
            fetchExpenses();
        }
    }, [kidProfile]);

    const formattedExpenses = formatByMonth(expenses);

    if (showLoadingScreen || !kidProfile) {
        return <IconLoader Icon={FaShoppingCart} color="#e7ab3c" />;
    }

    return (
        <>
            <KidsNav />
            <Container className="kids-container kids-expenses">
                <ProfileHeader />
                <Alert variant="warning" className="expenses-alert">
                    <p>
                        Aqui estão suas despesas. Você pode ver o que gastou em cada mês e em quê.
                    </p>
                </Alert>
                {Object.keys(formattedExpenses).sort().map(month => (
                    <Row key={month}>
                        <Col>
                            <h3>{month}</h3>
                            <ListGroup>
                                {formattedExpenses[month].map(expense => (
                                    <ListGroup.Item key={expense.id} className="expense-item">
                                        <div className="expense-date">{expense.date}</div>
                                        <div className="expense-icon">{getIconForCategory(expense.category, 'expenses')}</div>
                                        <div className="expense-description">{expense.description}</div>
                                        <div className="expense-amount">R$ {expense.amount}</div>
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
