import { Row, Col} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/MainTables';
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

  const fiis_subcategory = assets_by(portfolio_assets,'subcategory', 'Fundos Imobiliários')
  const fiis_total_brl = total_brl_by(portfolio_assets,'subcategory', 'Fundos Imobiliários')
  const treemap_fiis_subcategory = treemap_by(portfolio_assets,"subcategory", "Fundos Imobiliários")
  const fiis_piechart = piechart_by_ticker(portfolio_assets,"Fundos Imobiliários")

  return (
    <MainLayout>
      <PortfolioNav />
      <Row>
        <Col lg={4}>
            <SideModules 
            group_total={fiis_total_brl}  
            />
        </Col> 
        <Col lg={4}>
            <PieChart 
            total={fiis_piechart}
            />  
        </Col> 
        <Col lg={4}>
            <PieChart
            total={fiis_total_brl}
            />
        </Col> 
        <Col lg={12}>
            <GroupedTables
            grouped_assets={fiis_subcategory}
            currency="brl"
            />
            <TreeMap
            portfolio_treemap={treemap_fiis_subcategory}
            />  
        </Col>
      </Row>                   
    </MainLayout>
  )
};

export default Portfolio;