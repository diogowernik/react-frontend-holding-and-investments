import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets, fetchPortfolioQuotas} from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import GroupedTables from '../components/tables/MainTables';
import PieChart from '../components/charts/PieChart';
import TreeMap from '../components/charts/Treemap';
import LineChart from '../components/charts/LineChart';

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

  // Grouping for main tables creation
  // by category
  const assets_by_category = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield}]} 
  },{})
  const category_assets = Object.entries(assets_by_category).map(([name,data])=>({name, data}))
  // by broker
  const assets_by_broker = portfolio_assets.reduce((acc,curr)=>{
    const {broker, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, asset_price} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, asset_price}]}
  },{})
  const broker_assets = Object.entries(assets_by_broker).map(([name,data])=>({name, data}))
  // by subcategory (only for FIIs)
  const fiis_by_subcategory = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield}]}
  },{})
  const fiis_subcategory = Object.entries(fiis_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for Brasilian Stocks)
  const br_stocks_by_subcategory = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield}]}
  },{})
  const br_stocks_subcategory = Object.entries(br_stocks_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for REITs)
  const REITs_by_subcategory = portfolio_assets.filter( data => data.category === "REITs").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield}]}
  }
  ,{})
  const REITs_subcategory = Object.entries(REITs_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for Stocks)
  const stocks_by_subcategory = portfolio_assets.filter( data => data.category === "Stocks").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa, twelve_m_yield}]}
  }
  ,{})
  const stocks_subcategory = Object.entries(stocks_by_subcategory).map(([name,data])=>({name, data}))

  // Grouping for Category SideModules Sum Tables and Pie Chart
  // by category
  const total_by_category = Object.entries(assets_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl} 
  },{})
  const categories_total = Object.entries(total_by_category).map(([name,total_today_brl])=>({name, total_today_brl}))
  // by broker
  const total_by_broker = Object.entries(assets_by_broker).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl} 
  },{})
  const brokers_total = Object.entries(total_by_broker).map(([name,total_today_brl])=>({name, total_today_brl}))
  // by subcategory (only for FIIs)
  const total_by_fiis_subcategory = Object.entries(fiis_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  },{})
  const fiis_subcategory_total = Object.entries(total_by_fiis_subcategory).map(([name,total_today_brl])=>({name, total_today_brl}))
  // by subcategory (only for Brasilian Stocks)
  const total_by_br_stocks_subcategory = Object.entries(br_stocks_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  }
  ,{})
  const br_stocks_subcategory_total = Object.entries(total_by_br_stocks_subcategory).map(([name,total_today_brl])=>({name, total_today_brl}))
  // by subcategory (only for REITs)
  const total_by_REITs_subcategory = Object.entries(REITs_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  }
  ,{})
  const REITs_subcategory_total = Object.entries(total_by_REITs_subcategory).map(([name,total_today_brl])=>({name, total_today_brl}))
  // by subcategory (only for Stocks)
  const total_by_stocks_subcategory = Object.entries(stocks_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  }
  ,{})
  const stocks_subcategory_total = Object.entries(total_by_stocks_subcategory).map(([name,total_today_brl])=>({name, total_today_brl}))


  // Grouping for Pie Chart
  // by FIIs
  const total_by_fiis = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const fiis_total = Object.entries(total_by_fiis).map(([name,total_today_brl])=>({name, total_today_brl})) 
  fiis_total.sort((a, b) => b.total_today_brl - a.total_today_brl)
  // by Brasilian Stocks
  const total_by_br_stocks = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const br_stocks_total = Object.entries(total_by_br_stocks).map(([name,total_today_brl])=>({name, total_today_brl}))
  br_stocks_total.sort((a, b) => b.total_today_brl - a.total_today_brl)
  // by REITs
  const total_by_REITs = portfolio_assets.filter( data => data.category === "REITs").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const REITs_total = Object.entries(total_by_REITs).map(([name,total_today_brl])=>({name, total_today_brl}))
  REITs_total.sort((a, b) => b.total_today_brl - a.total_today_brl)
  // by Stocks
  const total_by_stocks = portfolio_assets.filter( data => data.category === "Stocks").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const stocks_total = Object.entries(total_by_stocks).map(([name,total_today_brl])=>({name, total_today_brl}))
  stocks_total.sort((a, b) => b.total_today_brl - a.total_today_brl)



  // Grouping for treemap chart
  // by category
  const treemap_by_category = portfolio_assets.reduce((acc,curr)=>{
  const {category, ticker, total_today_brl} = curr
  const existing = acc[category]||[]
  return {...acc, [category]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_categories = Object.entries(treemap_by_category).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")
  // order treemap categories by total_today_brl
  treemap_categories.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
  // by broker
  const treemap_by_broker = portfolio_assets.reduce((acc,curr)=>{
    const {broker, ticker, total_today_brl} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_brokers = Object.entries(treemap_by_broker).map(([name,data])=>({name, data}))
  // order treemap brokers by total_today_brl
  treemap_brokers.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
  // by subcategory (only for FIIs)
  const treemap_by_fiis_subcategory = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_fiis_subcategory = Object.entries(treemap_by_fiis_subcategory).map(([name,data])=>({name, data}))
  treemap_fiis_subcategory.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
  // by subcategory (only for Brasilian Stocks)
  const treemap_by_br_stocks_subcategory = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  }
  ,{})
  const treemap_br_stocks_subcategory = Object.entries(treemap_by_br_stocks_subcategory).map(([name,data])=>({name, data}))
  treemap_br_stocks_subcategory.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
  // by subcategory (only for REITs)
  const treemap_by_REITs_subcategory = portfolio_assets.filter( data => data.category === "REITs").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  }
  ,{})
  const treemap_REITs_subcategory = Object.entries(treemap_by_REITs_subcategory).map(([name,data])=>({name, data}))
  treemap_REITs_subcategory.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
  // by subcategory (only for Stocks)
  const treemap_by_stocks_subcategory = portfolio_assets.filter( data => data.category === "Stocks").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  }
  ,{})
  const treemap_stocks_subcategory = Object.entries(treemap_by_stocks_subcategory).map(([name,data])=>({name, data}))
  treemap_stocks_subcategory.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))

 

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
                        <Nav.Link eventKey="dashboard">Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="brokers">Corretoras</Nav.Link>
                    </Nav.Item>
                    {/* If setor_fiis show */}
                    {fiis_subcategory.length > 0 && (
                      <Nav.Item>
                          <Nav.Link eventKey="fiis">Fundos Imobiliários</Nav.Link>
                      </Nav.Item>
                    )}
                    {/* If setor_br_stocks show */}
                    {br_stocks_subcategory.length > 0 && (
                      <Nav.Item>
                          <Nav.Link eventKey="br-stocks">Ações Br</Nav.Link>
                      </Nav.Item>
                    )}
                    {/* If setor_stocks show */}
                    {REITs_subcategory.length > 0 && (
                      <Nav.Item>
                          <Nav.Link eventKey="REITs">REITs</Nav.Link>
                      </Nav.Item>
                    )}
                    {stocks_subcategory.length > 0 && (
                      <Nav.Item>
                          <Nav.Link eventKey="stocks">Stocks</Nav.Link>
                      </Nav.Item>
                    )}
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
                          total={fiis_total}
                        />  
                        <SideModules 
                        group_total={fiis_subcategory_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={fiis_subcategory}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_fiis_subcategory}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="br-stocks" >
                <Row>
                    <Col lg={4}>
                        <PieChart 
                          total={br_stocks_total}
                        />  
                        <SideModules 
                        group_total={br_stocks_subcategory_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={br_stocks_subcategory}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_br_stocks_subcategory}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="REITs" >
                <Row>
                    <Col lg={4}>
                        <PieChart 
                          total={REITs_total}
                        />  
                        <SideModules 
                        group_total={REITs_subcategory_total}   
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={REITs_subcategory}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_REITs_subcategory}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="stocks" >
                <Row>
                    <Col lg={4}>
                        <PieChart 
                          total={stocks_total}
                        />  
                        <SideModules 
                        group_total={stocks_subcategory_total}   
                        />
                    </Col> 
                    <Col lg={8}>
                        <GroupedTables
                        grouped_assets={stocks_subcategory}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_stocks_subcategory}
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