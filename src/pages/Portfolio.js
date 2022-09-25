import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import SideModules from '../components/sidemodules/SideModules'
import { fetchPortfolioAssets, fetchPortfolioQuotas, fetchFiis, fetchBrStocks } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import GroupedTables from '../components/tables/GroupedTables';
import FiiGroupedTables from '../components/tables/FiiGroupedTables';
import BrStocksGroupedTables from '../components/tables/BrStocksGroupedTables';
import FiiGroupedRadar from '../components/tables/FiiGroupedRadar';
import BrStocksGroupedRadar from '../components/tables/BrStocksGroupedRadar';
import PieChart from '../components/sidemodules/PieChart';
import TreeMap from '../components/dashboard/Treemap';
import LineChart from '../components/dashboard/LineChart';

const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
  const [portfolio_quotas, setPortfolioQuotas] = useState([]);
  const [fiis, setFiis] = useState([]);
  const [br_stocks, setBrStocks] = useState([]);

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

  const onFetchFiis = useCallback(async () => {
      const json = await fetchFiis(auth.token);
      if (json) {
          setFiis(json);
      }
      }, [auth.token]);
      useEffect(() => {
      onFetchFiis();
      }, [onFetchFiis]);

  const onFetchBrStocks = useCallback(async () => {
      const json = await fetchBrStocks(auth.token);
      if (json) {
          setBrStocks(json);
      }
      }, [auth.token]);
      useEffect(() => {
      onFetchBrStocks();
      }, [onFetchBrStocks]);

  // end of Fetchs

  // Grouping by category for table creation
  const grouped_assets_by_category = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, trade_profit, dividends_profit, asset_price, p_vpa_fii} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, broker, category, trade_profit, dividends_profit, asset_price, p_vpa_fii }]}
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
    const {broker, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, asset_price} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, asset_price}]}
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
  const treemap_categories = Object.entries(grouped_for_treemap_by_category).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")


  // Grouping for Fiis by Setor

  const grouped_assets_by_setor_fii = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa_fii, twelve_m_yield} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa_fii, twelve_m_yield}]}
  },{})
  const setor_fii_assets = Object.entries(grouped_assets_by_setor_fii).map(([name,data])=>({name, data}))

  // Grouping for BrStocks by Setor
  const grouped_assets_by_setor_br_stocks = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {subcategory, id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa_br_stocks, twelve_m_yield_br_stocks} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, shares_amount, share_average_price_brl, total_cost_brl, total_today_brl, profit, category, trade_profit, dividends_profit, asset_price, p_vpa_br_stocks, twelve_m_yield_br_stocks}]}
  }
  ,{})
  const setor_br_stocks_assets = Object.entries(grouped_assets_by_setor_br_stocks).map(([name,data])=>({name, data}))

  // Grouping for Fiis for Radar
  const grouped_fiis_for_radar = fiis.reduce((acc,curr)=>{
    const {subcategory, id, ticker, p_vpa, last_yield, six_m_yield, twelve_m_yield, price, ranking} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, p_vpa, last_yield, six_m_yield, twelve_m_yield, price, ranking}]}
  }
  ,{})
  const fiis_for_radar = Object.entries(grouped_fiis_for_radar).map(([name,data])=>({name, data}))

  // Grouping BrStocks for Radar
  const grouped_br_stocks_for_radar = br_stocks.reduce((acc,curr)=>{
    const {subcategory, id, ticker, p_vpa, twelve_m_yield, price, ev_ebit, roic, pl, roe, ranking, ranking_all} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {id, ticker, p_vpa, twelve_m_yield, price, ev_ebit, roic, pl, roe, ranking, ranking_all}]}
  }
  ,{})
  const br_stocks_for_radar = Object.entries(grouped_br_stocks_for_radar).map(([name,data])=>({name, data}))

  // Grouping for Fiis by Setor table Sum

  const setor_fii_total_today = Object.entries(grouped_assets_by_setor_fii).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  },{})
  const setor_fii_total = Object.entries(setor_fii_total_today).map(([name,total_today_brl])=>({name, total_today_brl}))

  // Grouping for BrStocks by Setor table Sum

  const setor_br_stocks_total_today = Object.entries(grouped_assets_by_setor_br_stocks).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl}
  }
  ,{})
  const setor_br_stocks_total = Object.entries(setor_br_stocks_total_today).map(([name,total_today_brl])=>({name, total_today_brl}))


  // Grouping for Treemap by Setor Fii
  const grouped_for_treemap_by_setor = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  },{})
  const treemap_setor_fii = Object.entries(grouped_for_treemap_by_setor).map(([name,data])=>({name, data}))

  // Grouping for Treemap by Setor BR Stocks
  const grouped_for_treemap_by_setor_br_stocks = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {subcategory, ticker, total_today_brl} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, { x: ticker, y: total_today_brl }]}
  }
  ,{})
  const treemap_setor_br_stocks = Object.entries(grouped_for_treemap_by_setor_br_stocks).map(([name,data])=>({name, data}))

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

  const grouped_assets_by_br_stocks = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const br_stocks_only = Object.entries(grouped_assets_by_br_stocks).map(([name,total_today_brl])=>({name, total_today_brl}))
 

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
                    <Nav.Item>
                        <Nav.Link eventKey="br-stocks">Ações Br</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="radar-fiis">Radar Fiis</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="radar-br-stocks">Radar Ações Br</Nav.Link>
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
                        <FiiGroupedTables
                        grouped_assets={setor_fii_assets}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_setor_fii}
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
                          total={br_stocks_only}
                        />  
                        <SideModules 
                        group_total={setor_br_stocks_total}      
                        />
                    </Col> 
                    <Col lg={8}>
                        <BrStocksGroupedTables
                        grouped_assets={setor_br_stocks_assets}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_setor_br_stocks}
                        />  
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="radar-fiis" >
                <Row>                  
                    <Col lg={12}>
                        <FiiGroupedRadar
                        fiis_for_radar={fiis_for_radar}
                        fiis={fiis}
                        /> 
                    </Col>
                  </Row>              
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="radar-br-stocks" >
                <Row>
                    <Col lg={12}>
                        <BrStocksGroupedRadar
                        br_stocks_for_radar={br_stocks_for_radar}
                        br_stocks={br_stocks}
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