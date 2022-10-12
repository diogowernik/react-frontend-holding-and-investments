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
// import { AiFillLayout } from 'react-icons/ai';
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
  // Side Module Patrimony BRL and Pie Chart by Category
  function total_brl_by(group_type, subcategory){
    const total_by_group_type = portfolio_assets.filter( 
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
      const {total_today_brl} = curr
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, {total_today_brl}]}
      },{})
      const total_group = Object.entries(total_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
        const {name, data} = curr
        const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
        return {...acc, [name]:total_today_brl}
      },{})
      const by_group = Object.entries(total_group).map(([name,total_today_brl])=>({name, total_today_brl}))
      return by_group
  }

  // Side Module Patrimony USD 
  function total_usd_by(group_type, subcategory){
    const total_by_group_type = portfolio_assets.filter( 
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
    const {total_today_usd} = curr
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, {total_today_usd}]}
    }
    ,{})
    const total_group = Object.entries(total_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_today_usd}
    }
    ,{})
    const by_group = Object.entries(total_group).map(([name,total_today_usd])=>({name, total_today_usd}))
    return by_group
  }

  // Treemap Module Percentage
  function treemap_by(group_type, subcategory){
    const treemap_by_group_type = portfolio_assets.filter( 
      // if group_type is subcategory, filter by subcategory if not, no filter
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
      const { ticker, portfolio_percentage} = curr
      if (portfolio_percentage === 0) return acc
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, { x: ticker, y: portfolio_percentage }]}
      },{})
      const treemap_group = Object.entries(treemap_by_group_type).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")
      treemap_group.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
      return treemap_group
  }

  // MainTables Module
  function assets_by(group_type, subcategory){
    const assets_by_group_type = portfolio_assets.filter(
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, curr]}
      },{})
      const assets_group = Object.entries(assets_by_group_type).map(([name,data])=>({name, data}))
      return assets_group
  }

  // Side Module Pie Chart by Ticker
  function piechart_by_ticker(subcategory) {
    const total_by = portfolio_assets.filter( data => data.category === `${subcategory}`).reduce((acc,curr)=>{
      const {ticker, total_today_brl} = curr
      return {...acc, [ticker]:total_today_brl}
    }
    ,{})
    const total_today = Object.entries(total_by).map(([name,total_today_brl])=>({name, total_today_brl})) 
    total_today.sort((a, b) => b.total_today_brl - a.total_today_brl)
    return total_today
  }

  const total_usd_by_category = total_usd_by('category')
  const total_usd_by_broker = total_usd_by('broker')
  const fiis_subcategory_total_usd = total_usd_by('subcategory','Fundos Imobiliários')
  const br_stocks_subcategory_total_usd = total_usd_by('subcategory','Ações Brasileiras')
  const REITs_subcategory_total_usd = total_usd_by('subcategory','REITs')
  const stocks_subcategory_total_usd = total_usd_by('subcategory','Stocks')

  const fiis_subcategory = assets_by('subcategory', 'Fundos Imobiliários')
  const br_stocks_subcategory = assets_by('subcategory', 'Ações Brasileiras')
  const REITs_subcategory = assets_by('subcategory','REITs')
  const stocks_subcategory = assets_by('subcategory','Stocks')
  const assets_by_category = assets_by('category')
  const assets_by_broker = assets_by('broker')

  const fiis_subcategory_total = total_brl_by('subcategory', 'Fundos Imobiliários')
  const br_stocks_subcategory_total = total_brl_by('subcategory','Ações Brasileiras')
  const REITs_subcategory_total = total_brl_by('subcategory','REITs')
  const stocks_subcategory_total = total_brl_by('subcategory','Stocks')
  const total_brl_by_category  = total_brl_by('category')
  const total_brl_by_broker = total_brl_by('broker')

  const treemap_fiis_subcategory = treemap_by("subcategory", "Fundos Imobiliários")
  const treemap_br_stocks_subcategory = treemap_by("subcategory", "Ações Brasileiras")
  const treemap_REITs_subcategory = treemap_by("subcategory", "REITs")
  const treemap_stocks_subcategory = treemap_by("subcategory", "Stocks")
  const treemap_categories = treemap_by("category")
  const treemap_brokers = treemap_by("broker")

  const fiis_piechart = piechart_by_ticker("Fundos Imobiliários")
  const br_stocks_piechart = piechart_by_ticker("Ações Brasileiras")
  const REITs_piechart = piechart_by_ticker("REITs")
  const stocks_piechart = piechart_by_ticker("Stocks")

// dividends grouping need some refactoring
  const dividends_by_category = portfolio_dividends.reduce((acc,curr)=>{
    const existing = acc[curr.category]||[]
    return {...acc, [[curr.category]]:[...existing, curr]}
  }
  ,{})


  function dividends_by(group_type, subcategory){
    const dividends_by_group_type = portfolio_dividends.filter(
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, curr]}
      },{})
      const dividends_group = Object.entries(dividends_by_group_type).map(([name,data])=>({name, data}))
      return dividends_group
  }

  const year_dividends = dividends_by("pay_date_by_year")
  const month_dividends = dividends_by("pay_date_by_month_year")
  const category_dividends = dividends_by("category")
  console.log(category_dividends)
  console.log(month_dividends)
  console.log(year_dividends)



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

  const dividends_total_by_category_brl = Object.entries(total_dividends_by_category_brl).map(([name,total_dividend_brl])=>({name, total_dividend_brl}))
  const dividends_total_by_category_usd = Object.entries(total_dividends_by_category_usd).map(([name,total_dividend_usd])=>({name, total_dividend_usd}))


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
                        group_total={total_brl_by_category}      
                        group_total_usd={total_usd_by_category}
                        />
                        <SideDividends 
                          total_dividends_brl={dividends_total_by_category_brl} 
                          total_dividends_usd={dividends_total_by_category_usd}
                        />
                        <PieChart 
                        total={total_brl_by_category}
                        />  
                    </Col> 
                    <Col lg={9}>
                        <GroupedTables
                        grouped_assets={assets_by_category}
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
                        group_total={total_brl_by_broker} 
                        group_total_usd={total_usd_by_broker}     
                        />
                        {/* <PieChart
                        total={total_brl_by_broker}
                        /> */}
                    </Col> 
                    <Col lg={9}>
                        <GroupedTables
                        grouped_assets={assets_by_broker}
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
                        total={fiis_piechart}
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
                        total={br_stocks_piechart}
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
                          total={REITs_piechart}
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
                          total={stocks_piechart}
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