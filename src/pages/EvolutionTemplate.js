import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioEvolution } from '../apis';
import AuthContext from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import PortfolioNavTemplate from '../components/nav/PortfolioNavTemplate';
import EvolutionTable from '../components/tables/EvolutionTable';
import StackedChart from '../components/charts/StackedChart';
import { groupBy } from '../group_functions';

const EvolutionTemplate = ({ currency }) => {
    const [portfolio_evolution, setPortfolioEvolution] = useState([]);
    const [chartData, setChartData] = useState({ series: [], categories: [] });
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

    useEffect(() => {
        if (portfolio_evolution.length > 0) {
            const processedData = processDataForChart(portfolio_evolution, 'category_total_brl');
            setChartData(processedData);
        }
    }, [portfolio_evolution]);

    function processDataForChart(data, currencyKey) {
        // Agrupar por categoria
        const groupedByCategory = groupBy(data, 'category');
    
        // Extrair datas únicas e ordená-las
        const uniqueDates = [...new Set(data.map(item => item.date))];
        uniqueDates.sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')));
    
        // Construir séries para o ApexCharts
        const series = Object.keys(groupedByCategory).map(category => {
            const dataPoints = uniqueDates.map(date => {
                const itemsOnDate = groupedByCategory[category].filter(item => item.date === date);
                return itemsOnDate.length
                    ? itemsOnDate.reduce((sum, item) => sum + item[currencyKey], 0)
                    : 0;
            });
    
            return { name: category, data: dataPoints };
        });
    
        return { series, categories: uniqueDates };
    }
    
    
    function chartRounded(chartData) {
        const roundedSeries = chartData.series.map(seriesItem => {
            return {
                ...seriesItem,
                data: seriesItem.data.map(value => Math.round(value))
            };
        });
    
        return { ...chartData, series: roundedSeries };
    }

    function chartDated(chartData) {
        const monthNames = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    
        const datedCategories = chartData.categories.map(category => {
            const [, month, year] = category.split('/');
            const monthIndex = parseInt(month, 10) - 1;
            return `${monthNames[monthIndex]}/${year.slice(2)}`;
        });
    
        // Ordenar as categorias baseadas em data
        const sortedCategories = datedCategories.sort((a, b) => {
            const [monthA, yearA] = a.split('/');
            const [monthB, yearB] = b.split('/');
            const dateA = new Date(parseInt(yearA, 10) + 2000, monthNames.indexOf(monthA));
            const dateB = new Date(parseInt(yearB, 10) + 2000, monthNames.indexOf(monthB));
            return dateA - dateB;
        });
    
        return { ...chartData, categories: sortedCategories };
    }

    const processedChartData = processDataForChart(portfolio_evolution, 'category_total_brl');
    const roundedChartData = chartRounded(processedChartData);
    const finalChartData = chartDated(roundedChartData);

    const renderTabs = () => {
        const years = portfolio_evolution.map(item => item.date.split('/')[2]);
        const uniqueYears = [...new Set(years)].sort();

        return (
            <ul className="nav nav-tabs">
                {uniqueYears.map(year => (
                    <li className="nav-item" key={year}>
                        <Button 
                            variant="link"
                            className={`nav-link ${activeYear === year ? 'active' : ''}`}
                            onClick={() => setActiveYear(year)}
                        >
                            {year}
                        </Button>
                    </li>
                ))}
            </ul>
        );
    };

    console.log(chartData)

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
                                <StackedChart 
                                    series={finalChartData.series}
                                    categories={finalChartData.categories}
                                    title="Crescimento Patrimonial"
                                    currency={currency}
                                />
                            </Card.Body>
                        </Card>
                        <Card className='mt-10'>
                            <Card.Body>
                                {renderTabs()}
                                <EvolutionTable
                                    portfolio_evolution={portfolio_evolution}
                                    activeYear={activeYear}
                                    currency={currency}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default EvolutionTemplate;