import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

import { fetchPortfolioDividends} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import DividendsTables from '../../components/tables/DividendsTablesBrl';
import SideDividends from '../../components/sidemodules/SideDividendsBrl';
import PortfolioNav from '../../components/nav/PortfolioNav';


const Portfolio = () => {
  const [portfolio_dividends, setPortfolioDividends] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();


  const onFetchPortfolioDividends = useCallback(async () => {
    const json = await fetchPortfolioDividends(params.id, auth.token);
    if (json) {
        setPortfolioDividends(json);
    }
    }, [params.id, auth.token]);
    useEffect(() => {
    onFetchPortfolioDividends();
    }, [onFetchPortfolioDividends]);

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
  // const category_dividends = dividends_by("category")



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
          <PortfolioNav/>
          <Row>
            <Col lg={3}> 
                <SideDividends 
                  total_dividends_brl={dividends_total_by_category_brl} 
                />
            </Col> 
            <Col lg={9}>
                <DividendsTables
                year_dividends={year_dividends}
                month_dividends={month_dividends}
                />
            </Col>
          </Row>                     
      </Container>
    </MainLayout>
  )
};

export default Portfolio;