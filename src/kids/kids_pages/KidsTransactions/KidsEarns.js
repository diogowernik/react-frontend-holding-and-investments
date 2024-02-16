import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import { FaPiggyBank } from 'react-icons/fa';
import { useKidProfile } from '../../contexts/KidProfileContext';
import KidsNav from '../../components/KidsNav/KidsNav';
import IconLoader from '../../components/IconLoader/IconLoader';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { formatByYearAndMonth, getIconForCategory } from '../../utils/financialUtils'; // updated import
import { fetchKidsEarns } from '../../../apis';

import './KidsEarns.css';
import '../../css/GlobalKids.css';

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
                setShowLoadingScreen(false);
            }
        };

        if (kidProfile) {
            fetchEarnings();
        }
    }, [kidProfile]);

    const formattedEarnings = formatByYearAndMonth(earnings); // updated usage

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
                {Object.entries(formattedEarnings).sort().reverse().map(([year, months]) => (
                    <React.Fragment key={year}>
                        <h2 className='text-center'>{year}</h2>
                        {Object.entries(months).map(([month, earns]) => (
                            <React.Fragment key={month}>
                                <h3>{month}</h3>
                                <ListGroup>
                                    {earns.map(earn => (
                                        <ListGroup.Item key={earn.id} className="earn-item">
                                            <div className="earn-date">{earn.date}</div>
                                            <div className="earn-icon">{getIconForCategory(earn.category, 'earnings')}</div>
                                            <div className="earn-description">{earn.description}</div>
                                            <div className="earn-amount">R$ {earn.amount}</div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </Container>
        </>
    );
};

export default KidsEarns;
