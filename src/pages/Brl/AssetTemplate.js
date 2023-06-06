import { Row, Col} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import PieChart from '../../components/charts/PieChart';
import TreeMap from '../../components/charts/Treemap';

import { assets_by, piechart_by_ticker, total_by, treemap_by} from '../../group_functions';

import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import PortfolioNav from '../../components/nav/Brl/PortfolioNav';
import GroupedTables from '../../components/tables/Brl/MainTable';

const AssetTemplate = ({assetType}) => {
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

  const subcategory = assets_by(portfolio_assets,'subcategory', assetType)
  const total = total_by(portfolio_assets,'subcategory', 'brl', assetType)
  const treemap_subcategory = treemap_by(portfolio_assets,"subcategory", assetType)
  const piechart = piechart_by_ticker(portfolio_assets, assetType)

  return (
    <MainLayout>
      <PortfolioNav />
      <Row>
        <Col lg={4}>
            <SideModules 
            group_total={total}  
            />
        </Col> 
        <Col lg={4}>
            <PieChart 
            total={piechart}
            />  
        </Col> 
        <Col lg={4}>
            <PieChart
            total={total}
            />
        </Col> 
        <Col lg={12}>
            <GroupedTables
            grouped_assets={subcategory}
            />
            <TreeMap
            portfolio_treemap={treemap_subcategory}
            />  
        </Col>
      </Row>                   
    </MainLayout>
  )
};

export default AssetTemplate;