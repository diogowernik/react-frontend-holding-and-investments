import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchAssets } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import AssetRadar from './AssetRadar';
import {groupMap} from '../../group_functions';

const Radar = () => {
  const [assets, setAssets] = useState([]);

  const auth = useContext(AuthContext);

  const onFetchAssets = useCallback(async () => {
      const json = await fetchAssets(auth.token);
      if (json) {
          setAssets(json);
      }
      }, [auth.token]);
      useEffect(() => {
      onFetchAssets();
      }, [onFetchAssets]);
  
  const assets_for_radar = groupMap(assets,'category')

  return (
    <MainLayout>
      <Container fluid>
      <Row>
            <Col lg={12}>
                <AssetRadar
                assets_for_radar={assets_for_radar}
                assets={assets}
                />
            </Col>
                    

       </Row>

      </Container>
      
    </MainLayout>
  )
};

export default Radar;