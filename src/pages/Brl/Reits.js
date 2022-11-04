import { Row, Col} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/MainTablesBrl';
import PieChart from '../../components/charts/PieChart';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import PortfolioNav from '../../components/nav/PortfolioNav';
import { assets_by, piechart_by_ticker, total_brl_by, treemap_by} from '../../group_functions';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token);
      if (json) {
          setPortfolioAssets(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);

  const REITs_subcategory = assets_by(portfolio_assets,'subcategory', 'REITs')
  const REITs_total_brl = total_brl_by(portfolio_assets,'subcategory', 'REITs')
  const treemap_REITs_subcategory = treemap_by(portfolio_assets,"subcategory", "REITs")
  const REITs_piechart = piechart_by_ticker(portfolio_assets,"REITs")

  return (
    <MainLayout>
      <PortfolioNav />
      <Row>
        <Col lg={4}>
            <SideModules 
            group_total={REITs_total_brl}  
            />
        </Col> 
        <Col lg={4}>
            <PieChart 
            total={REITs_piechart}
            />  
        </Col> 
        <Col lg={4}>
            <PieChart
            total={REITs_total_brl}
            />
        </Col> 
        <Col lg={12}>
            <GroupedTables
            grouped_assets={REITs_subcategory}
            />
            <TreeMap
            portfolio_treemap={treemap_REITs_subcategory}
            />  
        </Col>
      </Row>                   
    </MainLayout>
  )
};

export default Portfolio;