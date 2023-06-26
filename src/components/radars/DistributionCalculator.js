import {Col, Row, Card, Form, Button, Alert} from 'react-bootstrap';
import {fetchRadarAssets , fetchRadarCategories} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const DistributionCalculator = () => {
    const [radar_assets, setRadarAssets] = useState([]);
    const [radar_categories, setRadarCategories] = useState([]);

    const [aporte, setAporte] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [remainingAporte, setRemainingAporte] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [maxAssets, setMaxAssets] = useState(null);

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


    const handleSubmit = event => {
      event.preventDefault();
  
      if (maxAssets && maxAssets > radar_assets.length) {
          // Aqui você pode definir um estado de erro e mostrar uma mensagem para o usuário, 
          // ou simplesmente ignorar o valor de maxAssets e prosseguir com o cálculo para todos os ativos.
          console.error('Erro: o número máximo de ativos é maior do que a quantidade disponível.');
          return;
      }
  
      let remainingAporte = aporte;
      let resultados = [];
      let lastAporte = remainingAporte + 1;  // Initialize with a different value
      let iterationCount = 0;
  
      while (remainingAporte > Math.min(...radar_assets.map(asset => asset.price_brl)) && Math.abs(lastAporte - remainingAporte) > 0.01 && iterationCount < 1000) {
          iterationCount++;
          lastAporte = remainingAporte;
          
          // Consider only the assets that pass the category filter for the calculation of totalDelta
          let assetsInCategory = radar_assets.filter(asset => selectedCategory === "Todas" || asset.category === selectedCategory);
  
          // If maxAssets is defined and less than the number of assets in the category, restrict the assets to the first maxAssets
          if (maxAssets) {
              assetsInCategory = assetsInCategory.slice(0, maxAssets);
          }
  
          let totalDelta = assetsInCategory.reduce((sum, asset) => sum + asset.delta_ideal_actual_percentage_on_portfolio, 0);
          
          for (const asset of assetsInCategory) {
              if (remainingAporte <= 0) {
                  break; // Exit the loop when the remainingAporte is zero or negative
              }
              
              let moneyToInvestInAsset = (asset.delta_ideal_actual_percentage_on_portfolio / totalDelta) * remainingAporte;
              let cotas = Math.floor(moneyToInvestInAsset / asset.price_brl);
              let totalInvestedInAsset = cotas * asset.price_brl;
  
              // Make sure we can buy at least one share
              if (cotas > 0) {
                  remainingAporte -= totalInvestedInAsset;
  
                  // Find this asset in the resultados array and update it, or add a new entry
                  const assetIndex = resultados.findIndex(result => result.ticker === asset.asset);
                  if (assetIndex > -1) {
                      resultados[assetIndex].cotas += cotas;
                      resultados[assetIndex].total_invested += totalInvestedInAsset;
                  } else {
                      resultados.push({
                          cotas,
                          ticker: asset.asset,
                          category: asset.category,
                          price_brl: asset.price_brl,
                          total_invested: totalInvestedInAsset,
                      });
                  }
              } else {
                  totalDelta -= asset.delta_ideal_actual_percentage_on_portfolio;
              }
          }
      }
  
      if (remainingAporte > 0) {
          setRemainingAporte(remainingAporte);
      }
  
      setResultados(resultados);
  };
  
  
    
    return (
        <>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>Calculadora de distribuição de ativos</Card.Header>
              
              
              <Card.Body>
    <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Valor do aporte:</Form.Label>
                    <Form.Control
                        type="number"
                        value={isNaN(aporte) ? "" : aporte}
                        onChange={e => setAporte(parseFloat(e.target.value))}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Control as="select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="Todas">Todas</option>
                        {radar_categories.map(category => (
                            <option key={category.category} value={category.category}>{category.category}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Máximo de ativos para investir com este aporte:</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    placeholder="Em branco distribui por todos"
                    onChange={e => setMaxAssets(e.target.value ? parseInt(e.target.value) : null)}
                />
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col xs="auto" className="my-auto">
                <Button variant="primary" type="submit">
                    Calcular
                </Button>
            </Col>
        </Row>
    </Form>
</Card.Body>


            </Card>
          </Col>
        </Row>
        {remainingAporte > 0 && (
          <Alert variant='info' className='mt-3'>
            Sobrou {remainingAporte.toFixed(2)} reais do aporte inicial.
          </Alert>
        )}
        <Row>
          {resultados.map(({ ticker, cotas, category, price_brl, total_invested }) => (
            <Col key={ticker} lg={4}>
              <Card className='mb-3'>
                <Card.Header>{ticker}</Card.Header>
                <Card.Body>
                  <p>{cotas} cotas</p>
                  <p>{category}</p>
                  <p>{price_brl} reais por cota</p>
                  <p>Total: {total_invested.toFixed(2)} reais</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )
};

export default DistributionCalculator;
