import {Col, Row, Card, ProgressBar, Button, Collapse } from 'react-bootstrap';
import { 
    fetchRadarAssets,
    fetchRadarCategories
} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const AssetCard = ({ asset }) => {
    const [open, setOpen] = useState(false);

    return (
        <Card key={asset.id} className="mb-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    {asset.asset} | {(asset.ideal_asset_percentage_on_category * 100).toFixed(2)}%
                    <Button
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-text"
                        aria-expanded={open}
                    >
                        {open ? <FiChevronUp /> : <FiChevronDown />}
                    </Button>
                </div>
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="collapse-text">
                <strong>Porcentagem ideal:</strong> {(asset.ideal_asset_percentage_on_portfolio * 100).toFixed(2)}%
                <br/>
                <strong>Porcentagem atual:</strong> {(asset.portfolio_investment_percentage_on_portfolio * 100).toFixed(2)}%
                <br/>
                <strong>Falta para completar:</strong> {'\u00A0'}
                {(
                    asset.delta_ideal_actual_percentage_on_portfolio *
                    asset.portfolio_total_value
                ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
                <br/>
                <strong>Cota em reais:</strong> {'\u00A0'}
                {asset.price_brl.toLocaleString(
                    "pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
                <br/>
                <strong>Cota em dólares:</strong> {'\u00A0'}
                {asset.price_usd.toLocaleString(
                    "pt-BR", {
                    style: "currency",
                    currency: "USD",
                })}
                <br/>
                {/* falta para completar x cotas  arredondar para cima*/}
                Faltam: {'\u00A0'}
                <strong>{Math.ceil((asset.delta_ideal_actual_percentage_on_portfolio *
                asset.portfolio_total_value) /
                asset.price_brl).toFixed(0)} cotas </strong> para completar
                </Card.Body>
                
                
                

            </Collapse>
            <Card.Footer style={{backgroundColor: "white"}}>
            <Row>
                <Col xs={2} className="mb-1 text-muted small">
                    0%
                </Col>
                <Col xs={7} className="mb-1">
                    <ProgressBar>
                        <ProgressBar 
                            striped 
                            variant="success" 
                            now={(asset.portfolio_investment_percentage_on_portfolio / asset.ideal_asset_percentage_on_portfolio * 100).toFixed(2)} 
                            key={1} 
                        />
                        <ProgressBar 
                            variant="light" 
                            now={(asset.delta_ideal_actual_percentage_on_portfolio / asset.ideal_asset_percentage_on_portfolio * 100).toFixed(2)} 
                            key={2} 
                        />
                    </ProgressBar>
                </Col>
                <Col xs={3} className="mb-1 text-muted small">
                    {`${(asset.ideal_asset_percentage_on_portfolio * 100).toFixed(1)}%`}
                </Col>
            </Row>
            </Card.Footer>
        </Card>
    );
};

const DistributionPanel = () => {
    const [radar_assets, setRadarAssets] = useState([]);
    const [radar_categories, setRadarCategories] = useState([]);

    const auth = useContext(AuthContext);
    const params = useParams();


    const onFetchRadarAssets = useCallback(async () => {
        const json = await fetchRadarAssets(params.id, params.radar_id, auth.token);
        if (json) {
            setRadarAssets(json);
        }
    }, [params.id, params.radar_id, auth.token]);

    const onFetchRadarCategories = useCallback(async () => {
        const json = await fetchRadarCategories(params.id, params.radar_id, auth.token);
        if (json) {
            setRadarCategories(json);
        }
    }, [params.id, params.radar_id, auth.token]);


    useEffect(() => {
        onFetchRadarAssets();
        onFetchRadarCategories();
    }, [onFetchRadarAssets, onFetchRadarCategories]);


    return (
      <>
        <Row>
          {radar_categories.map((category, index) => {
            let assets_for_panel = radar_assets.filter(
              (asset) => asset.category === category.category
            );
            return (
              <Col key={index}>
                <Card className="mb-2">
                  <Card.Header>
                    {category.category} |{" "}
                    {(category.ideal_category_percentage * 100).toFixed(2)}%
                  </Card.Header>
                </Card>

                {assets_for_panel.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}

              </Col>
            );
          })}
        </Row>
      </>
    );
};

export default DistributionPanel;