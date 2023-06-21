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

    const desired_category = [
        { category: 'Stocks', ideal_percentage: 18 },
        { category: 'Ações Brasileiras', ideal_percentage: 18 },
        { category: 'REITs', ideal_percentage: 18 },
        { category: 'Propriedades', ideal_percentage: 18 },
        { category: 'Fundos Imobiliários', ideal_percentage: 18 },
        { category: 'Criptomoedas', ideal_percentage: 1 },
        { category: 'Caixa', ideal_percentage: 4.5 },
        { category: 'Caixa Internacional', ideal_percentage: 4.5 }
    ]

    const totalInvestment = total.reduce((sum, category) => sum + category.total, 0);

    const handleSubmit = event => {
        event.preventDefault();
        
        const resultados = [];
        
        // calcular aportes para cada categoria
        for (const category of desired_category) {
            const idealCategoryTotal = aporte * category.ideal_percentage ;
            const assets = ideal_asset_percentage.filter(asset => asset.category === category.category);
        
            for (const asset of assets) {
                const idealAssetTotal = idealCategoryTotal * asset.ideal_percentage / 100;
                const cotas = Math.floor(idealAssetTotal / asset.price_brl); 
        
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

        // Determine o número máximo de ativos em qualquer categoria
    const maxAssets = Math.max(...desired_category.map(category => {
        const relevant_assets = ideal_asset_percentage.filter(asset => asset.category === category.category);
        return relevant_assets.length;
    }));
    


    return (
        <>
            <Row>
                <Col lg={12}>
                    <h1>Calculadora de Distribuição</h1>
                    <p>Calculadora de distribuição de ativos para a carteira {params.id}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Valor do aporte:
                            <input type="number" value={aporte} onChange={e => setAporte(parseFloat(e.target.value))} />
                        </label>
                        <input type="submit" value="Calcular" />
                    </form>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <h4>Resultados</h4>
                    {resultados.map(({ ticker, cotas }) => (
                        <p key={ticker}>{ticker} | {cotas} cotas</p>
                    ))}
                </Col>
            </Row>


    <table className="table table-striped table-bordered">
        <thead>
            <tr>
                {desired_category.map((category, index) => (
                    <th key={index}>{category.category} | {category.ideal_percentage} %</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {Array.from({ length: maxAssets }, (_, i) => i).map(row => (
                <tr key={row}>
                    {desired_category.map((category, index) => {
                        let relevant_assets = ideal_asset_percentage.filter(asset => asset.category === category.category);
                        // Classificar os ativos pela porcentagem desejada
                        relevant_assets = [...relevant_assets].sort((a, b) => (b.ideal_percentage * category.ideal_percentage / 100) - (a.ideal_percentage * category.ideal_percentage / 100));
                        const asset = relevant_assets[row];
                        if (asset) {
                            const portfolio_asset = portfolio_assets.find(pa => pa.ticker === asset.ticker);
                            return (
                                <td key={index}>
                                    <div key={asset.id}>
                                        <p>{asset.ticker}
                                            <ul>
                                                <li>% desejada: {(asset.ideal_percentage * category.ideal_percentage / 100).toFixed(2)} %</li>
                                                <li>% atual: {portfolio_asset ? (portfolio_asset.total_today_brl / totalInvestment * 100).toFixed(2) : 0.00} %</li>
                                            </ul>
                                        </p>
                                    </div>
                                </td>
                            );
                        }
                        return <td key={index} />; // Retorna uma célula vazia se não houver ativo para essa linha
                    })}
                </tr>
            ))}
        </tbody>
    </table>

        </>
    )
};

export default DistributionCalculator;
