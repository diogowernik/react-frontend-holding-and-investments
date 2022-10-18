import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';

import { fetchPortfolioAssets, fetchPortfolioDividends} from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../components/tables/MainTablesBrl';
import PieChart from '../components/charts/PieChart';
import TreeMap from '../components/charts/Treemap';
import DividendsTables from '../components/tables/DividendsTables';
import SideModules from '../components/sidemodules/SidePatrimonialBrl'
import SideDividends from '../components/sidemodules/SideDividendsBrl';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);
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



  const fiis_subcategory = assets_by('subcategory', 'Fundos Imobiliários')
  const br_stocks_subcategory = assets_by('subcategory', 'Ações Brasileiras')
  const REITs_subcategory = assets_by('subcategory','REITs')
  const stocks_subcategory = assets_by('subcategory','Stocks')
  const assets_by_category = assets_by('category')
  const assets_by_broker = assets_by('broker')

  const fiis_total_brl = total_brl_by('subcategory', 'Fundos Imobiliários')
  const br_stocks_total_brl = total_brl_by('subcategory','Ações Brasileiras')
  const REITs_total_brl = total_brl_by('subcategory','REITs')
  const stocks_total_brl = total_brl_by('subcategory','Stocks')
  const categories_total_brl  = total_brl_by('category')
  const brokers_total_brl = total_brl_by('broker')

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

  // const year_dividends = dividends_by("pay_date_by_year")
  // const month_dividends = dividends_by("pay_date_by_month_year")
  const category_dividends = dividends_by("category")
  // console.log(category_dividends)
  // console.log(month_dividends)
  // console.log(year_dividends)



  const total_dividends_by_category_brl = Object.entries(dividends_by_category).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
    const {name, data} = curr
    const total_dividend_brl = data.map(({ total_dividend_brl }) => total_dividend_brl).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_dividend_brl} 
  }
  ,{})

  const dividends_total_by_category_brl = Object.entries(total_dividends_by_category_brl).map(([name,total_dividend_brl])=>({name, total_dividend_brl}))


  return (
    <MainLayout>
      <Container fluid>
        <Tab.Container defaultActiveKey="dashboard">
      <Row>
        <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills" className="flex-row">   
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
                        group_total={categories_total_brl}    
                        />
                        <SideDividends 
                          total_dividends_brl={dividends_total_by_category_brl} 
                        />
                        <PieChart 
                        total={categories_total_brl}
                        />  
                    </Col> 
                    <Col lg={9}>
                        <GroupedTables
                        grouped_assets={assets_by_category}
                        />
                        <TreeMap
                        portfolio_treemap={treemap_categories}
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
                        group_total={brokers_total_brl}
                        />
                        <PieChart
                        total={brokers_total_brl}
                        />
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
                        group_total={fiis_total_brl}  
                        />
                        <PieChart
                        total={fiis_total_brl}
                        />
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
                        group_total={br_stocks_total_brl}    
                        />
                        <PieChart 
                        total={br_stocks_piechart}
                        />  
                        {/* <PieChart
                        total={br_stocks_total}
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
                        group_total={REITs_total_brl}  
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
                        group_total={stocks_total_brl}   
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