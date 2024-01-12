import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioEvolution } from '../apis';
import AuthContext from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { filterGroupMap } from '../group_functions';
import PortfolioNavTemplate from '../components/nav/PortfolioNavTemplate';

const EvolutionTemplate = ({ currency }) => {
    const [portfolio_evolution, setPortfolioEvolution] = useState([]);
    const [activeYear, setActiveYear] = useState('');

    const auth = useContext(AuthContext);
    const params = useParams();

    const onFetchPortfolioEvolution = useCallback(async () => {
        const json = await fetchPortfolioEvolution(params.id, auth.token);
        if (json) {
            setPortfolioEvolution(json);
        }
    }, [params.id, auth.token]);

    useEffect(() => {
        onFetchPortfolioEvolution();
    }, [onFetchPortfolioEvolution]);

    useEffect(() => {
        const years = portfolio_evolution.map(item => item.date.split('/')[2]);
        const uniqueYears = [...new Set(years)];
        setActiveYear(uniqueYears.sort().reverse()[0]);
    }, [portfolio_evolution]);

    const renderTabs = () => {
        const years = portfolio_evolution.map(item => item.date.split('/')[2]);
        const uniqueYears = [...new Set(years)];

        return (
            <ul className="nav nav-tabs">
                {uniqueYears.map(year => (
                    <li className="nav-item" key={year}>
                        <a 
                            className={`nav-link ${activeYear === year ? 'active' : ''}`}
                            onClick={() => setActiveYear(year)}
                        >
                            {year}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    const renderTabContent = () => {
        const filteredEvolution = portfolio_evolution.filter(item => item.date.includes(activeYear));
        const filteredCategoryEvolution = filterGroupMap(filteredEvolution, "date");

        filteredCategoryEvolution.forEach(category => {
            category.data.sort((a, b) => a.category > b.category ? 1 : -1);
        });

        const category_evolution_sum = filteredCategoryEvolution.map(name => {
            const category_total = name.data.reduce((acc, cur) => acc + cur[`category_total_${currency}`], 0);
            return { name: name.name, total: category_total };
        });

        const combinedData = filteredCategoryEvolution.reduce((acc, cur) => [...acc, ...cur.data], []);
        const categoryMap = combinedData.reduce((acc, cur) => {
            acc[cur.category] = acc[cur.category] || [];
            acc[cur.category].push(cur);
            return acc;
        }, {});

        return (
            <table className="table table-sm table-hover table-striped table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">Categoria</th>
                        {filteredCategoryEvolution.map(({ name }) => (
                            <th scope="col" key={name}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(categoryMap).map(([category, values]) => (
                        <tr key={category}>
                            <th>{category}</th>
                            {values.map(({ id, ...category_total }) => (
                                <td key={id}>
                                    {category_total[`category_total_${currency}`].toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() })}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr key="total" className="text-primary font-weight-bold">
                        <th>Total</th>
                        {category_evolution_sum.map(({ total }) => (
                            <td key={total}>
                                {total.toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() })}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <MainLayout>
            <PortfolioNavTemplate currency={currency} />
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Crescimento Patrimonial</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {renderTabs()}
                                {renderTabContent()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default EvolutionTemplate;

