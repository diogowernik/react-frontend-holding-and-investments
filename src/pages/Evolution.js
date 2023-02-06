import { Row, Col, Container, Card} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioEvolution } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import { assets_by } from '../group_functions';

const Radar = () => {
    const [portfolio_evolution, setPortfolioEvolution] = useState([]);

    const auth = useContext(AuthContext);
    const params = useParams();

    const onFetchPortfolioEvolution = useCallback(async () => {
        const json = await fetchPortfolioEvolution(params.id, auth.token);
        if (json) {
            setPortfolioEvolution(json);
        }
        }, [params.id, auth.token]);
        useEffect(() => {
        onFetchPortfolioEvolution();
        }, [onFetchPortfolioEvolution]);

    
    
    const category_evolution = assets_by(portfolio_evolution, "date")
    // order categories data by category
    category_evolution.forEach((category) => {
        category.data.sort((a, b) => {
            if (a.category > b.category) {
                return 1;
            }
            if (a.category < b.category) {
                return -1;
            }
            return 0;
        })
    })
    const sumCategoryData = currency => category_evolution.map((name, data) => {
        const category_total = name.data.reduce((acc, cur) => {
          return acc + cur[`category_total_${currency}`];
        }, 0);
        return {
          name: name.name,
          total: category_total
        }
      });
      
    const category_evolution_sum_brl = sumCategoryData("brl");
    const category_evolution_sum_usd = sumCategoryData("usd");





    const combinedData = category_evolution.reduce((acc, cur) => {
        return [...acc, ...cur.data];
      }, []);
      
    const categoryMap = combinedData.reduce((acc, cur) => {
    if(!acc[cur.category]) {
        acc[cur.category] = [cur];
        return acc;
    }
    acc[cur.category].push(cur);
    return acc;
    }, {});


  return (
    <MainLayout>
      <Container fluid>
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>Crescimento Patrimonial em Reais</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <table className="table table-sm table-hover table-striped table-bordered table-responsive-sm">
                            <thead>
                                <tr>
                                <th scope="col">Categoria</th>
                                {category_evolution.map(({ name }) => (
                                    <th scope="col" key={name}>{name}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                            {Object.entries(categoryMap).map(([category, values]) => (
                                <tr key={category}>
                                    <th>{category}</th>
                                    {values.map(({ id, category_total_brl }) => (
                                    <td key={id}>{category_total_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr key="total" className="text-primary font-weight-bold">
                                <th>Total</th>
                          {category_evolution_sum_brl.map(({ total }) => (
                                <td key={total}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            ))}
                            </tr>
                            


                            </tbody>
                        </table>
                    </Card.Body>
                    
                
                </Card>
            </Col>
            
        
            <Col md={12} className="mt-3">
                <Card>
                    <Card.Header>
                        <Card.Title>Crescimento Patrimonial em Dolares</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <table className="table table-sm table-hover table-striped table-bordered table-responsive-sm">
                            <thead>
                                <tr>
                                <th scope="col">Categoria</th>
                                {category_evolution.map(({ name }) => (
                                    <th scope="col" key={name}>{name}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                            {Object.entries(categoryMap).map(([category, values]) => (
                                <tr key={category}>
                                    <th>{category}</th>
                                    {values.map(({ id, category_total_usd }) => (
                                    <td key={id}>{category_total_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr key="total" className="text-primary font-weight-bold">
                                <th>Total</th>
                          {category_evolution_sum_usd.map(({ total }) => (
                                <td key={total}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</td>
                            ))}
                            </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                    
                
                </Card>
            </Col>
        </Row>
        
      </Container>
      
    </MainLayout>
  )
};

export default Radar;