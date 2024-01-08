import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioAssets, updatePortfolioAsset, removePortfolioAsset} from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioNav from '../components/nav/PortfolioNavTemplate';

const EditableTables = ({assetType, currency}) => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token, assetType);
      if (json) {
          setPortfolioAssets(json);
      }
  }, [params.id, auth.token, assetType]);
  
  useEffect(() => {
      onFetchPortfolioAssets();
  }, [onFetchPortfolioAssets]);


  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav 
          currency={currency}
        />
          <Row>
            <Col lg={12}>
              <h1>Editable Tables</h1>
              <table className="table table-striped table-sm">
                <thead>
                  <tr>                              
                    <th>Ticker</th>
                    <th>Cotação</th>
                    <th>Qnt</th>
                    <th>Valor</th>
                    <th>Custo</th>
                    <th>PM</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio_assets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.ticker}</td>
                      <td>{asset.price}</td>
                      <td>{asset.quantity}</td>
                      <td>{asset.value}</td>
                      <td>{asset.cost}</td>
                      <td>{asset.average_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
        
            </Col>
          </Row>
      </Container>
    </MainLayout>
  )
};

export default EditableTables;
