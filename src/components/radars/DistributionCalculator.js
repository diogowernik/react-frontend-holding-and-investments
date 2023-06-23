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
    const [remainingAporte, setRemainingAporte] = useState(0);


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

    const radar_true = assets_radar.filter(asset => asset.is_radar === true);
    const ideal_asset_percentage = radar_true.filter(asset => asset.ideal_percentage > 0);
    // const new_ideal_percentage = ideal_percentage.map(asset => {
    //     return {
    //         ...asset,
    //         ideal_percentage: asset.ideal_percentage / 4 
    //     }
    // });
    console.log(ideal_asset_percentage);



    const totalInvestment = total.reduce((sum, category) => sum + category.total, 0);

    const handleSubmit = event => {
        event.preventDefault();
    
        const maxInvestmentPerAsset = 1000; // Define the maximum investment per asset

        // Sort the assets in decreasing order of ideal percentage
        ideal_asset_percentage.sort((a, b) => b.ideal_percentage - a.ideal_percentage);
        
        
        let remainingAporte = aporte;
        let resultados = [];
        
        for (const asset of ideal_asset_percentage) {
            if (remainingAporte <= 0) {
                break; // Exit the loop when the remainingAporte is zero or negative
            }
        
            let moneyToInvestInAsset = Math.min(maxInvestmentPerAsset, remainingAporte);
            let cotas = Math.floor(moneyToInvestInAsset / asset.price_brl);
            let totalInvestedInAsset = cotas * asset.price_brl;
        
            // Make sure we can buy at least one share
            if (cotas > 0) {
                remainingAporte -= totalInvestedInAsset;
                
                resultados.push({
                    cotas,
                    ticker: asset.ticker,
                    price_brl: asset.price_brl,
                    total_invested: totalInvestedInAsset,
                    ideal_percentage: asset.ideal_percentage
                });
            }
        }
        
        if (remainingAporte > 0) {
            setRemainingAporte(remainingAporte);
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
                <Col lg={6}>
                    <h1>Calculadora de Distribuição</h1>
                    <p>Calculadora de distribuição de ativos para a carteira {params.id}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Valor do aporte:
                            <input type="number" value={isNaN(aporte) ? "" : aporte} onChange={e => setAporte(parseFloat(e.target.value))} />

                        </label>
                        <input type="submit" value="Calcular" />
                    </form>
                </Col>
            
                <Col lg={6}>
                    <h4>Resultados</h4>
                    {resultados.map(({ ticker, cotas, category, price_brl, ideal_percentage }) => (
                        <p key={ticker}>{ticker} | {cotas} cotas | {category} | {price_brl} | total: {cotas * price_brl} | {ideal_percentage} %</p>
                    ))}
                    {/* show only if remainingAporte > 0 */}
                    {remainingAporte > 0 && (
                        <p>Sobrou {remainingAporte.toFixed(2)} reais do aporte inicial.</p>
                    )}
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
                                        <div>{asset.ticker}
                                        <br/>
                                        {(asset.ideal_percentage * category.ideal_percentage / 100).toFixed(2)} % = 
                                        {'\u00A0'}
                                        {(asset.ideal_percentage * category.ideal_percentage / 100 * totalInvestment / 100).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        <br/>
                                            {portfolio_asset ? (portfolio_asset.total_today_brl / totalInvestment * 100).toFixed(2) : 0.00} % = 
                                            {'\u00A0'}
                                            {portfolio_asset ? portfolio_asset.total_today_brl.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 0.00} 
                                        </div>
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
