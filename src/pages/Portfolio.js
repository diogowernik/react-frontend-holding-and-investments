import { Row, Col, Container, Nav, Card, Tab } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import Dashboard from './Dashboard'
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
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
          setPortfolioAssets(json);
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

  // portfolio_assets grouping
  const grouped_assets = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit }]}
  },{})
  const assets = Object.entries(grouped_assets).map(([name,data])=>({name, data}))
  
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
                  {assets.map(({name})=>(
                    <Nav.Item key={name}>
                      <Nav.Link eventKey={name}>{name}</Nav.Link>
                    </Nav.Item>
                  ))}
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
            {assets.map(({name,data})=>(
              <Tab.Pane eventKey={name} key={name}>
                <Row>
                <Col lg={12}>
                    <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">{name}</Card.Header>
                        <Card.Body>
                        <div className="table-responsive">
                        <table className="table table-striped table-sm">
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Ticker</th>
                              <th>Quantidade</th>
                              <th>Preço Médio</th>
                              <th>Custo Total</th>
                              <th>Total Hoje</th>
                              <th>Lucro</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map(({id, ticker, shares_amount, share_average_price_brl, total_cost_brl ,total_today_brl, profit})=>(
                              <tr key={id}>
                                <td>{id}</td>
                                <td>{ticker}</td>
                                <td>{shares_amount}</td>
                                <td>{share_average_price_brl}</td>
                                <td>{total_cost_brl}</td>
                                <td>{total_today_brl}</td>
                                <td>{profit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                        </Card.Body>
                    </Card>  
                </Col>
                  
                </Row>
                

              </Tab.Pane>
            ))}
        </Tab.Content>
        </Col>
        </Tab.Container>
      </Row>
      </Container>
    </MainLayout>
  )
};

export default Portfolio;