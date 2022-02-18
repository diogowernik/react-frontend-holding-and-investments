import { Row, Col, Container, Nav, Card, Tab } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import Dashboard from './Dashboard'
import Fiis from './Fiis'
import Cryptos from './Cryptos'
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';



const Portfolio = () => {
  
  const [portfolio_assets, setPortfolioAssets] = useState([]);
  const [portfolio_fiis, setPortfolioFiis] = useState([]);
  const [portfolio_total_fiis, setTotalPortfolioFiis] = useState([]);
  const [portfolio_criptos, setPortfolioCriptos] = useState([]);
  const [portfolio_total, setPortfolioTotal] = useState([]);
  // const [portfolio_category_label, setPortfolioCategoryLabel] = useState([]);
  // const [portfolio_category_total, setPortfolioCategoryTotal] = useState([]);

  function groupBy(lista, column){
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
      resultado.push({ name: i, total_today_brl: columns[i].map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) });
  
    return resultado;
  }
  
  // console.log(categories)
  // console.log(categories.map(a=>a.name))
  // console.log(categories.map(a=>a.total_today_brl))


  const auth = useContext(AuthContext);
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(auth.token);
      if (json) {
          setPortfolioAssets(json);
          setPortfolioFiis(json.filter( data => data.category === "Fundos Imobiliários"));
          setTotalPortfolioFiis(json.filter( data => data.category === "Fundos Imobiliários").reduce((a, e) => a + e.total_today_brl, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
          setPortfolioCriptos(json.filter( data => data.category === "Criptomoedas")); 
          setPortfolioTotal(groupBy(json,"category"));
          // setPortfolioCategoryLabel(groupBy(json,"category"));
          // setPortfolioCategoryTotal(groupBy(json,"category"));
      }
      }, [auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);
  

  return (
    <MainLayout>
      <Container fluid>
      <Row>
        <Col lg={3}>
          <SideModules 
          portfolio_total={portfolio_total}
          portfolio_assets={portfolio_assets}
          portfolio_total_fiis={portfolio_total_fiis}
          
          
          />
        </Col> 
        <Tab.Container defaultActiveKey="dashboard">
        <Col lg={9}>
        <Card className=" mb-3">
            <Card.Header>
              <Nav variant="pills">
                  <Nav.Item>
                      <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="fiis" >Fiis</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="cryptos" >Cryptos</Nav.Link>
                  </Nav.Item>
              </Nav>
            </Card.Header>
        </Card>
        <Tab.Content>
            <Tab.Pane eventKey="dashboard" >
                <Dashboard portfolio_total={portfolio_total}/>
            </Tab.Pane>
            <Tab.Pane eventKey="fiis">
                <Fiis data={portfolio_fiis}/>
            </Tab.Pane>
            <Tab.Pane eventKey="cryptos">
                <Cryptos data={portfolio_criptos}/>
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