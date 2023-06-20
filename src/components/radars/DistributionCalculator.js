import {Col, Row} from 'react-bootstrap';
import { fetchPortfolioAssets, fetchAssets } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { total_by } from '../../group_functions';


const DistributionCalculator = () => {

    const [portfolio_assets, setPortfolioAssets] = useState([]);
    const [assets_radar, setAssetsRadar] = useState([]);
    const [aporte, setAporte] = useState(0);
    const [resultados, setResultados] = useState([]);

    const auth = useContext(AuthContext);
    const params = useParams();
  
    const onFetchPortfolioAssets = useCallback(async () => {
        const json = await fetchPortfolioAssets(params.id, auth.token);
        if (json) {
            setPortfolioAssets(json);
        }
    }, [params.id, auth.token]);

    const onFetchAssets = useCallback(async () => {
        const json = await fetchAssets(auth.token);
        if (json) {
            setAssetsRadar(json);
        }
    }, [auth.token]);

    useEffect(() => {
        onFetchPortfolioAssets();
        onFetchAssets();
    }, [onFetchPortfolioAssets, onFetchAssets]);
  
    const total = total_by(portfolio_assets, "category", "brl");

    const radar_true = assets_radar.filter(asset => asset.is_radar === true);
    const ideal_asset_percentage = radar_true.filter(asset => asset.ideal_percentage > 0);
    console.log(ideal_asset_percentage);

    const desired_category = {
        "Stocks": 18,
        "Ações Brasileiras": 18,
        "REITs": 18,
        "Propriedades": 18,
        "Fundos Imobiliários": 18,
        "Criptomoedas": 1,
        "Caixa": 4.5,
        "Caixa Internacional": 4.5
    };

    const totalInvestment = total.reduce((sum, category) => sum + category.total, 0);

    const handleSubmit = event => {
        event.preventDefault();
        
        const resultados = [];
        
        // calcular aportes para cada categoria
        for (const category of Object.keys(desired_category)) {
            const idealCategoryTotal = aporte * desired_category[category] / 100;
            const assets = ideal_asset_percentage.filter(asset => asset.category === category);
    
            for (const asset of assets) {
                const idealAssetTotal = idealCategoryTotal * asset.ideal_percentage / 100;
                const cotas = Math.floor(idealAssetTotal / asset.price_brl); // corrigido aqui
    
                if (cotas > 0) {
                    resultados.push({
                        ticker: asset.ticker,
                        cotas
                    });
                }
            }
        }
    
        setResultados(resultados);
    };
    


    return (
        <>
            <Row>
                <Col lg={12}>
                    <h1>Calculadora de Distribuição</h1>
                    <p>Calculadora de distribuição de ativos para a carteira {params.id}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Valor do aporte:
                            <input type="number" value={aporte} onChange={e => setAporte(e.target.value)} />
                        </label>
                        <input type="submit" value="Calcular" />
                    </form>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <h4>Resultados</h4>
                    {resultados.map(({ ticker, cotas }) => (
                        <p key={ticker}>{ticker} - {cotas} cotas</p>
                    ))}
                </Col>
            </Row>
            <Row>
                {/* <Col lg={3}>
                    <h4>Porcentagem ideal por categoria</h4>
                    {Object.keys(desired_category).map(category => (
                        <p key={category}>{category} | {desired_category[category]} %</p>
                    ))}
                </Col>
                <Col lg={3}>
                    <h4>Porcentagens ideais por ativos</h4>
                    {ideal_asset_percentage.map(asset => (
                        <p key={asset.id}>{asset.ticker} | {asset.category} | {asset.ideal_percentage.toFixed(2)} %</p>
                    ))}
                </Col>
                <Col lg={3}>
                    <h4>Porcentagem atual por categoria</h4>
                    {total.map(category => (
                        <p key={category.category}>{category.name} | {(category.total / totalInvestment * 100).toFixed(2)} %</p>
                    ))}
                </Col>
                <Col lg={3}>
                    <h4>Porcentagens atuais por ativos</h4>
                    {portfolio_assets.map(asset => (
                        <p key={asset.id}>{asset.ticker} | {asset.category} | {(asset.total_today_brl / totalInvestment * 100).toFixed(2)} %</p>

                    ))}
                </Col> */}
            </Row>
        </>
    )
};

export default DistributionCalculator;
