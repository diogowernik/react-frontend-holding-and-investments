import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/MainTables';
import PieChart from '../../components/charts/PieChart';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import SideDividends from '../../components/sidemodules/Brl/SideDividends';
import PortfolioNav from '../../components/nav/PortfolioNav';
import { assets_by, total_brl_by, treemap_by} from '../../group_functions';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

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

  const assets_by_category = assets_by(portfolio_assets,'category')
  const categories_total_brl  = total_brl_by(portfolio_assets,'category')
  const treemap_categories = treemap_by(portfolio_assets,"category")

  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav />

        <Row>
          <Col lg={4}>
              <SideModules 
              group_total={categories_total_brl}    
              />
          </Col> 
          <Col lg={5}>
              <PieChart 
              total={categories_total_brl}
              />  
          </Col> 
          
          <Col lg={3}>
              <SideDividends />
          </Col> 
          <Col lg={12}>
              <GroupedTables
              grouped_assets={assets_by_category}
              currency="brl"
              />
              <TreeMap
              portfolio_treemap={treemap_categories}
              /> 
                
          </Col>
        </Row>
                
      </Container>
      
    </MainLayout>
  )
};

export default Portfolio;