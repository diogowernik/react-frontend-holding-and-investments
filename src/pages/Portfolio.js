import { Row, Col, Container, Nav, Card, Tab } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import Dashboard from './Dashboard'
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import FixedIncomes from './FixedIncome';
import Fiis from './Fiis'
import Cryptos from './Cryptos'
import Internationals from './International';


const Portfolio = () => {
  const [portfolio_fiis, setPortfolioFiis] = useState([]);
  const [portfolio_criptos, setPortfolioCriptos] = useState([]);
  const [portfolio_fixed_income, setPortfolioFixedIncome] = useState([]);
  const [portfolio_international, setPortfolioInternational] = useState([]);

  const [portfolio_categories, setPortfolioCategories] = useState([]);
  const [portfolio_treemap, setPortfolioTreemap] = useState([]);
  const auth = useContext(AuthContext);

  // PieChart grouping
  function categoriesGroupBy(lista, column){
    var columns = {};
    var resultado = [];
    lista.forEach(function (item) {
      var reg = {};
      columns[item[column]] = columns[item[column]] || [];
      for (var i in item)
        if (i !== column)
          reg[i] = item[i];
      columns[item[column]].push(reg);
    });
    for (var i in columns)
      resultado.push({ name: i, total_today_brl: columns[i].map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0) });
    return resultado;
  }

  // Fetchs
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(auth.token);
      if (json) {
          setPortfolioFiis(json.filter( data => data.category === "Fundos Imobiliários"));
          setPortfolioCriptos(json.filter( data => data.category === "Criptomoedas")); 
          setPortfolioFixedIncome(json.filter( data => data.category === "Renda Fixa")); 
          setPortfolioInternational(json.filter( data => data.category === "Internacional")); 
          setPortfolioCategories(categoriesGroupBy(json,"category"));
          setPortfolioTreemap(json);
      }
      }, [auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);
  

  // Treemap grouping
  const grouped = portfolio_treemap.reduce((acc,curr)=>{
    const {category, ticker, total_today_brl} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap = Object.entries(grouped).map(([name,data])=>({name, data}))
  
  return (
    <MainLayout>
      <Container fluid>
      <Row>
        <Col lg={4}>
          <SideModules 
          portfolio_categories={portfolio_categories}          
          />
        </Col> 
        <Tab.Container defaultActiveKey="dashboard">
        <Col lg={8}>
        <Card className=" mb-3">
            <Card.Header>
              <Nav variant="pills">
                  <Nav.Item>
                      <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="fiis" >Fundos Imobiliarios</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="cryptos" >Criptomoedas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="fixed_income" >Renda Fixa</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="international" >Internacional</Nav.Link>
                  </Nav.Item>
              </Nav>
            </Card.Header>
        </Card>
        <Tab.Content>
            <Tab.Pane eventKey="dashboard" >
                <Dashboard 
                portfolio_categories={portfolio_categories}
                portfolio_treemap={treemap}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="fiis">
                <Fiis data={portfolio_fiis}/>
            </Tab.Pane>
            <Tab.Pane eventKey="cryptos">
                <Cryptos data={portfolio_criptos}/>
            </Tab.Pane>
            <Tab.Pane eventKey="fixed_income">
                <FixedIncomes data={portfolio_fixed_income}/>
            </Tab.Pane>
            <Tab.Pane eventKey="international">
                <Internationals data={portfolio_international}/>
            </Tab.Pane>
        </Tab.Content>
        </Col>
        </Tab.Container>
      </Row>
      </Container>
    </MainLayout>
  )
};

export default Portfolio;