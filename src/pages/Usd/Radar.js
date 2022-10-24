import { Row, Col, Container, Nav, Card, Tab} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchFiis, fetchBrStocks } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import FiiGroupedRadar from '../../components/tables/FiiRadar';
import BrStocksGroupedRadar from '../../components/tables/BrStocksRadar';

const Radar = () => {
  const [fiis, setFiis] = useState([]);
  const [br_stocks, setBrStocks] = useState([]);

  const auth = useContext(AuthContext);


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
 

  return (
    <MainLayout>
      <Container fluid>
        <Tab.Container defaultActiveKey="radar-fiis">
      <Row>
        <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    <Nav.Item>
                        <Nav.Link eventKey="radar-fiis">Radar Fiis</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="radar-br-stocks">Radar Ações</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link eventKey="tradingview">Trading View</Nav.Link>
                    </Nav.Item> */}
                </Nav>
              </Card.Header>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>        
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
            {/* <Tab.Content>
                <Tab.Pane eventKey="tradingview" >
                <iframe 
                  src="http://localhost:3000/tradingview.html"
                  width="100%"
                  height="650px"
                  
                ></iframe>
                </Tab.Pane>
            </Tab.Content> */}
        
        </Col>
      </Row>
      </Tab.Container>
      </Container>
      
    </MainLayout>
  )
};

export default Radar;