import { Row, Col, Container, Nav, Card, Tab, Tabs} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import Dashboard from './Dashboard'
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Datatable from '../contexts/Datatable';
import { useParams} from 'react-router-dom';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
  const [portfolio_categories, setPortfolioCategories] = useState([]);
  const [portfolio_treemap, setPortfolioTreemap] = useState([]);
  const [portfolio_broker_assets, setBrokerAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  // Fetchs
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token);
      if (json) {
          setPortfolioAssets(json);
          setPortfolioCategories(json);
          setPortfolioTreemap(json);
          // setBrokerAssets try to filter for each category
          setBrokerAssets(json.filter( data => data.category === "Fundos Imobiliários"));
      }
      }, [params.id, auth.token]);
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

  // portfolio_assets grouping by category
  const grouped_assets = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, category }]}
  },{})
  const assets = Object.entries(grouped_assets).map(([name,data])=>({name, data}))
  // console.log(assets)

  // portfolio_assets grouping by broker inside each category
  const grouped_broker_assets = portfolio_broker_assets.reduce((acc,curr)=>{
    const {broker, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category}]}
  },{})
  const broker_assets = Object.entries(grouped_broker_assets).map(([name,data])=>({name, data}))
  // console.log(broker_assets)

  // portfolio_categories grouping
  const grouped_categories = portfolio_categories.reduce((acc,curr)=>{
    const {category, total_today_brl} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, { total_today_brl }]}
  },{})
  // sum categories
  const categories = Object.entries(grouped_categories).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl} 
  },{})
 const categories_total = Object.entries(categories).map(([name,total_today_brl])=>({name, total_today_brl}))
  
  return (
    <MainLayout>
      <Container fluid>
      <Row>
        <Col lg={4}>
          <SideModules 
          categories_total={categories_total}          
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
                        <Tabs defaultActiveKey="todos" id="assets-tab" className="mb-3">
                          <Tab eventKey="todos" title="Todos">
                          <Col lg={12}>
                            <Card  color="gray" className="mb-3">   
                              <Card.Header className="bg-gray-lighter">
                                <h5 className='float-left'>
                                {name}
                                </h5>
                                <h5 className='float-right'>
                                Total: {data.reduce((acc,{total_today_brl})=>(acc+total_today_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </h5>
                              </Card.Header>
                              <Card.Body>
                                  <Datatable className="table-responsive">
                                  <table className="table table-striped table-sm">
                                    <thead>
                                      <tr>                              
                                        <th>Ticker</th>
                                        <th>Quantidade</th>
                                        <th>Preço Médio</th>
                                        <th>Custo Total</th>
                                        <th>Total Hoje</th>
                                        <th>Lucro</th>
                                        <th>Broker</th>
                                        <th>Categoria</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.map(({id, ticker, shares_amount, share_average_price_brl, total_cost_brl ,total_today_brl, profit, broker, category})=>(
                                        <tr key={id}>
                                          
                                          <td>{ticker}</td>
                                          <td>{shares_amount}</td>
                                          <td>{share_average_price_brl}</td>
                                          <td>{total_cost_brl}</td>
                                          <td>{total_today_brl}</td>
                                          <td>{profit}</td>
                                          <td>{broker}</td>
                                          <td>{category}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  </Datatable>
                              </Card.Body>
                            </Card>
                          </Col>
                          </Tab>
                          
                          {broker_assets.map(({name,data})=>(
                            // {broker_assets.filter( data => data.category === "Fundos Imobiliários").map(({name,data})=>(
                            // filter by category
                            <Tab eventKey={name} title={name} key={name}>
                              <Row>
                              <Col lg={12}>
                                  <Card  color="gray" className="mb-3">   
                                      <Card.Header className="bg-gray-lighter">
                                        {/* float left */}
                                        <h5 className="float-left">
                                          {name}
                                        </h5>
                                        {/* float right */}
                                        <h5 className="float-right">
                                           {data.reduce((acc,{total_today_brl})=>(acc+total_today_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </h5>
                                        </Card.Header>
                                      <Card.Body>
                                      <Datatable className="table-responsive">
                                      <table className="table table-striped table-sm">
                                        <thead>
                                          <tr>                              
                                            <th>Ticker</th>
                                            <th>Quantidade</th>
                                            <th>Preço Médio</th>
                                            <th>Custo Total</th>
                                            <th>Total Hoje</th>
                                            <th>Lucro</th>
                                            <th>Categoria</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {data.map(({id, ticker, shares_amount, share_average_price_brl, total_cost_brl ,total_today_brl, profit, category})=>(
                                            <tr key={id}>
                                              
                                              <td>{ticker}</td>
                                              <td>{shares_amount}</td>
                                              <td>{share_average_price_brl}</td>
                                              <td>{total_cost_brl}</td>
                                              <td>{total_today_brl}</td>
                                              <td>{profit}</td>
                                              <td>{category}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </Datatable>
                                      </Card.Body>
                                      <Card.Footer className="bg-gray-lighter">
                                        <Card.Text>
                                          <small className="text-muted">
                                            
                                            </small>
                                        </Card.Text>
                                      </Card.Footer>
                                  </Card>  
                              </Col>
                                
                              </Row>
                            </Tab>  
                          ))} 
                          <Tab eventKey="radar" title="Radar" disabled>
                          <Col lg={12}>
                            <Card  color="gray" className="mb-3">
                              <Card.Header className="bg-gray-lighter">
                                Radar
                              </Card.Header>
                              <Card.Body>
                                </Card.Body>
                            </Card>
                          </Col>
                          </Tab>

                          </Tabs>
                        
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