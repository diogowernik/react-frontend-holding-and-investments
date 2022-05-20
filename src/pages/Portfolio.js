import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets, fetchPortfolioQuotas } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import GroupedTables from '../components/tables/GroupedTables';
import PieChart from '../components/sidemodules/PieChart';
import TreeMap from '../components/dashboard/Treemap';
import LineChart from '../components/dashboard/LineChart';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
  const [portfolio_quotas, setPortfolioQuotas] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  // Fetchs
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token);
      if (json) {
          setPortfolioAssets(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);

  const onFetchPortfolioQuotas = useCallback(async () => {
      const json = await fetchPortfolioQuotas(params.id, auth.token);
      if (json) {
          setPortfolioQuotas(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioQuotas();
      }, [onFetchPortfolioQuotas]);
  // end of Fetchs

  // Grouping by category for table creation
  const grouped_assets_by_category = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, category }]}
  },{})
  const category_assets = Object.entries(grouped_assets_by_category).map(([name,data])=>({name, data}))

  // Grouping for Category table Sum
  const categories_total_today = Object.entries(grouped_assets_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl} 
  },{})
 const categories_total = Object.entries(categories_total_today).map(([name,total_today_brl])=>({name, total_today_brl}))

  // Grouping by broker for table creation
  // const grouped_assets_by_broker = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
  const grouped_assets_by_broker = portfolio_assets.reduce((acc,curr)=>{
    const {broker, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category}]}
  },{})
  const broker_assets = Object.entries(grouped_assets_by_broker).map(([name,data])=>({name, data}))

    // Grouping for Category table Sum
    const brokers_total_today = Object.entries(grouped_assets_by_broker).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_today_brl} 
    },{})
   const brokers_total = Object.entries(brokers_total_today).map(([name,total_today_brl])=>({name, total_today_brl}))

   // Grouping for treemap by category
   const grouped_for_treemap_by_category = portfolio_assets.reduce((acc,curr)=>{
    const {category, ticker, total_today_brl} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_categories = Object.entries(grouped_for_treemap_by_category).map(([name,data])=>({name, data}))

  // Grouping for Fiis by Setor

  const grouped_assets_by_setor_fii = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {setor_fii, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category} = curr
    const existing = acc[setor_fii]||[]
    return {...acc, [setor_fii]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category}]}
  },{})
  const setor_fii_assets = Object.entries(grouped_assets_by_setor_fii).map(([name,data])=>({name, data}))

  // Grouping for Fiis by Setor table Sum

  const setor_fii_total_today = Object.entries(grouped_assets_by_setor_fii).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  },{})
  const setor_fii_total = Object.entries(setor_fii_total_today).map(([name,total_today_brl])=>({name, total_today_brl}))



  // Grouping for Treemap by Setor
  const grouped_for_treemap_by_setor = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {setor_fii, ticker, total_today_brl} = curr
    const existing = acc[setor_fii]||[]
    return {...acc, [setor_fii]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_setor_fii = Object.entries(grouped_for_treemap_by_setor).map(([name,data])=>({name, data}))

  // Grouping for treemap by broker
  const grouped_for_treemap_by_broker = portfolio_assets.reduce((acc,curr)=>{
    const {broker, ticker, total_today_brl} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_brokers = Object.entries(grouped_for_treemap_by_broker).map(([name,data])=>({name, data}))

  // grouping fiis only filter Fundos Imobiliários
  const grouped_assets_by_fiis = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const fiis_only = Object.entries(grouped_assets_by_fiis).map(([name,total_today_brl])=>({name, total_today_brl})) 

  // const grouped_assets_all = portfolio_assets.reduce((acc,curr)=>{
  //   const {ticker, total_today_brl} = curr
  //   return {...acc, [ticker]:total_today_brl}
  // }
  // ,{})
  // const all_assets = Object.entries(grouped_assets_all).map(([name,total_today_brl])=>({name, total_today_brl}))
 

  return (
    <MainLayout>
      <Container fluid>
        <Tab.Container defaultActiveKey="dashboard">
      <Row>
        <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    <Nav.Item>
                        <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="brokers">Brokers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="fiis">Fundos Imobiliários</Nav.Link>
                    </Nav.Item>
                </Nav>
              </Card.Header>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>        
        
            <Tab.Content>
                <Tab.Pane eventKey="dashboard" >
                  <Row>
                    <Col lg={4}>
                        <SideModules 
                        group_total={categories_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={category_assets}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_categories}
                        />    
                        <LineChart
                        portfolio_linechart={portfolio_quotas}
                        />  
                    </Col>
                  </Row>
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="brokers" >
                <Row>
                    <Col lg={4}>
                        <SideModules 
                        group_total={brokers_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={broker_assets}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_brokers}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="fiis" >
                <Row>
                    <Col lg={4}>
                        <PieChart 
                          total={fiis_only}
                        />  
                        <SideModules 
                        group_total={setor_fii_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={setor_fii_assets}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_setor_fii}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
        
        </Col>
      </Row>
      </Tab.Container>
      </Container>
      
    </MainLayout>
  )
};

export default Portfolio;