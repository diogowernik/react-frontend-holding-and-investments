import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import SideModules from '../components/sidemodules/SideModules'
import { 
  fetchPortfolioAssets, 
  fetchPortfolioDividends,
  fetchPortfolioQuotas} from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import GroupedTables from '../components/tables/MainTables';
import PieChart from '../components/charts/PieChart';
import TreeMap from '../components/charts/Treemap';
import LineChart from '../components/charts/LineChart';
import DividendsTables from '../components/tables/DividendsTables';
import SideDividends from '../components/sidemodules/SideDividends';
// import { data } from 'jquery';

const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
  const [portfolio_quotas, setPortfolioQuotas] = useState([]);
  const [portfolio_dividends, setPortfolioDividends] = useState([]);

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

  const onFetchPortfolioDividends = useCallback(async () => {
    const json = await fetchPortfolioDividends(params.id, auth.token);
    if (json) {
        setPortfolioDividends(json);
    }
    }, [params.id, auth.token]);
    useEffect(() => {
    onFetchPortfolioDividends();
    }, [onFetchPortfolioDividends]);

  // end of Fetchs
  // Grouping for main tables creation
  
  // by category
  const assets_by_category = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker, shares_amount, share_average_price_brl, 
                                              total_cost_brl, total_today_brl, total_today_usd, profit, 
                                              broker, category, trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  },{})

  const dividends_by_category = portfolio_dividends.reduce((acc,curr)=>{
    const {category, id, ticker, subcategory, record_date, pay_date, total_dividend_brl, total_dividend_usd} = curr
    const existing = acc[category]||[]
    return {...acc, [category]:[...existing, {id, ticker,  subcategory, record_date, pay_date, total_dividend_brl, total_dividend_usd}]}
  }
  ,{})
  const category_assets = Object.entries(assets_by_category).map(([name,data])=>({name, data}))

  const category_dividends = Object.entries(dividends_by_category).map(([name,data])=>({name, data}))

  // by broker
  const assets_by_broker = portfolio_assets.reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, 
      total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
      trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[broker]||[]
    return {...acc, [broker]:[...existing, {category, id, ticker, shares_amount, share_average_price_brl, 
      total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
      trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  },{})
  const broker_assets = Object.entries(assets_by_broker).map(([name,data])=>({name, data}))
  // by subcategory (only for FIIs)
  const fiis_by_subcategory = portfolio_assets.filter( data => data.category === "Fundos Imobiliários").reduce((acc,curr)=>{
    const{category, id, ticker, shares_amount, share_average_price_brl, 
      total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
      trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  },{})
  const fiis_subcategory = Object.entries(fiis_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for Brasilian Stocks)
  const br_stocks_by_subcategory = portfolio_assets.filter( data => data.category === "Ações Brasileiras").reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  },{})
  const br_stocks_subcategory = Object.entries(br_stocks_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for REITs)
  const REITs_by_subcategory = portfolio_assets.filter( data => data.category === "REITs").reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  }
  ,{})
  const REITs_subcategory = Object.entries(REITs_by_subcategory).map(([name,data])=>({name, data}))
  // by subcategory (only for Stocks)
  const stocks_by_subcategory = portfolio_assets.filter( data => data.category === "Stocks").reduce((acc,curr)=>{
    const {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory} = curr
    const existing = acc[subcategory]||[]
    return {...acc, [subcategory]:[...existing, {category, id, ticker, shares_amount, share_average_price_brl, 
        total_cost_brl, total_today_brl, total_today_usd, profit, broker, 
        trade_profit_brl, dividends_profit_brl, asset_price, p_vpa, twelve_m_yield, subcategory}]}
  }
  ,{})
  const stocks_subcategory = Object.entries(stocks_by_subcategory).map(([name,data])=>({name, data}))

  // Grouping for Category SideModules Sum Tables and Pie Chart BRL
  // by category
  const total_by_category = Object.entries(assets_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_brl} 
  },{})
  const total_dividends_by_category_brl = Object.entries(dividends_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_dividend_brl = data.map(({ total_dividend_brl }) => total_dividend_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_dividend_brl} 
  }
  ,{})
  const total_dividends_by_category_usd = Object.entries(dividends_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_dividend_usd = data.map(({ total_dividend_usd }) => total_dividend_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_dividend_usd} 
  }
  ,{})

  const categories_total = Object.entries(total_by_category).map(([name,total_today_brl])=>({name, total_today_brl}))

  const dividends_total_by_category_brl = Object.entries(total_dividends_by_category_brl).map(([name,total_dividend_brl])=>({name, total_dividend_brl}))
  const dividends_total_by_category_usd = Object.entries(total_dividends_by_category_usd).map(([name,total_dividend_usd])=>({name, total_dividend_usd}))
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

  // Grouping for Category SideModules Sum Tables and Pie Chart USD
  // by category
  const total_by_category_usd = Object.entries(assets_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd} 
  }
  ,{})
  const categories_total_usd = Object.entries(total_by_category_usd).map(([name,total_today_usd])=>({name, total_today_usd}))
  // by broker
  const total_by_broker_usd = Object.entries(assets_by_broker).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd} 
  }
  ,{})
  const brokers_total_usd = Object.entries(total_by_broker_usd).map(([name,total_today_usd])=>({name, total_today_usd}))
  // by subcategory (only for FIIs)
  const total_by_fiis_subcategory_usd = Object.entries(fiis_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd}
  }
  ,{})
  const fiis_subcategory_total_usd = Object.entries(total_by_fiis_subcategory_usd).map(([name,total_today_usd])=>({name, total_today_usd}))
  // by subcategory (only for Brasilian Stocks)
  const total_by_br_stocks_subcategory_usd = Object.entries(br_stocks_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd}
  }
  ,{})
  const br_stocks_subcategory_total_usd = Object.entries(total_by_br_stocks_subcategory_usd).map(([name,total_today_usd])=>({name, total_today_usd}))
  // by subcategory (only for REITs)
  const total_by_REITs_subcategory_usd = Object.entries(REITs_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd}
  }
  ,{})
  const REITs_subcategory_total_usd = Object.entries(total_by_REITs_subcategory_usd).map(([name,total_today_usd])=>({name, total_today_usd}))
  // by subcategory (only for Stocks)
  const total_by_stocks_subcategory_usd = Object.entries(stocks_by_subcategory).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_today_usd}
  }
  ,{})
  const stocks_subcategory_total_usd = Object.entries(total_by_stocks_subcategory_usd).map(([name,total_today_usd])=>({name, total_today_usd}))



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

  // Grouping for Tree Map without filter
  function treemap_by(group_type){
    const treemap_by_group_type = portfolio_assets.reduce((acc,curr)=>{
      const { ticker, total_today_brl} = curr
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, { x: ticker, y: total_today_brl }]}
      },{})
      const treemap_group = Object.entries(treemap_by_group_type).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")
      treemap_group.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
      return treemap_group
  }
  const treemap_categories = treemap_by("category")
  const treemap_brokers = treemap_by("broker")

  function treemap_subcategory_by(group_type, subcategory){
    const treemap_by_group_type = portfolio_assets.filter( data => data.category === `${subcategory}`).reduce((acc,curr)=>{
      const { ticker, total_today_brl} = curr
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, { x: ticker, y: total_today_brl }]}
      },{})
      const treemap_group = Object.entries(treemap_by_group_type).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")
      treemap_group.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
      return treemap_group
  }

  const treemap_fiis_subcategory = treemap_subcategory_by("subcategory", "Fundos Imobiliários")
  const treemap_br_stocks_subcategory = treemap_subcategory_by("subcategory", "Ações Brasileiras")
  const treemap_REITs_subcategory = treemap_subcategory_by("subcategory", "REITs")
  const treemap_stocks_subcategory = treemap_subcategory_by("subcategory", "Stocks")

  // sum of all total_dividend_brl
  // const total_dividend_brl = portfolio_dividends.reduce((acc, {total_dividend_brl}) => acc + total_dividend_brl, 0);
  // sum of all total_dividend_usd
  // const total_dividend_usd = portfolio_dividends.reduce((acc, {total_dividend_usd}) => acc + total_dividend_usd, 0);

  return (
    <MainLayout>
      <Container fluid>
        <Tab.Container defaultActiveKey="dividends">
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
                    <Nav.Item>
                        <Nav.Link eventKey="dividends">Dividendos</Nav.Link>
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
                    <Col lg={3}>
                        <SideModules 
                        group_total={categories_total}      
                        group_total_usd={categories_total_usd}
                        />
                        <SideDividends 
                          total_dividends_brl={dividends_total_by_category_brl} 
                          total_dividends_usd={dividends_total_by_category_usd}
                        />
                        <PieChart 
                        total={categories_total}
                        />  
                    </Col> 
                    <Col lg={9}>
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
                    <Col lg={3}>
                        <SideModules 
                        group_total={brokers_total} 
                        group_total_usd={brokers_total_usd}     
                        />
                        {/* <PieChart
                        total={brokers_total}
                        /> */}
                    </Col> 
                    <Col lg={9}>
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
                    <Col lg={3}>
                        <SideModules 
                        group_total={fiis_subcategory_total}  
                        group_total_usd={fiis_subcategory_total_usd}    
                        />
                        {/* <PieChart
                        total={fiis_subcategory_total}
                        /> */}
                        <PieChart 
                        total={fiis_total}
                        />  
                    </Col> 
                    <Col lg={9}>
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
                    <Col lg={3}>
                        <SideModules 
                        group_total={br_stocks_subcategory_total}    
                        group_total_usd={br_stocks_subcategory_total_usd}  
                        />
                        <PieChart 
                        total={br_stocks_total}
                        />  
                        {/* <PieChart
                        total={br_stocks_subcategory_total}
                        /> */}
                    </Col> 
                    <Col lg={9}>
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
                    <Col lg={3}>
                        <SideModules 
                        group_total={REITs_subcategory_total}  
                        group_total_usd={REITs_subcategory_total_usd} 
                        />
                        <PieChart 
                          total={REITs_total}
                        />  
                    </Col> 
                    <Col lg={9}>
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
                    <Col lg={3}> 
                        <SideModules 
                        group_total={stocks_subcategory_total}   
                        group_total_usd={stocks_subcategory_total_usd}
                        />
                        <PieChart 
                          total={stocks_total}
                        /> 
                    </Col> 
                    <Col lg={9}>
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
            <Tab.Content>
                <Tab.Pane eventKey="dividends" >
                <Row>
                    <Col lg={3}> 
                        <SideDividends 
                          total_dividends_brl={dividends_total_by_category_brl} 
                          total_dividends_usd={dividends_total_by_category_usd}
                        />
                        
                    </Col> 
                    <Col lg={9}>
                        <DividendsTables
                        dividends_category={category_dividends}
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