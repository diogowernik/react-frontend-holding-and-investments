import { Card, Col, Row } from 'react-bootstrap';
import React, {  } from 'react';

const Cryptos = ({data=[]}) => {

  return (
        <Row>
            <Col lg={12}>
                <Card  color="gray" className="mb-3">   
                    <Card.Header className="bg-gray-lighter">Cryptos</Card.Header>
                    <Card.Body>
                    Tabela que puxa os portfolio_assets, apenas categoria Cryptos
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Ticker</th>
                                <th>Quantidade</th>
                                <th>Total Hoje</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((portfolio_asset) => (
                            <tr key={portfolio_asset.id}>
                                <td>{portfolio_asset.category}</td>
                                <td>{portfolio_asset.ticker}</td>
                                <td>{portfolio_asset.shares_amount}</td>
                                <td>{portfolio_asset.total_today_brl}</td>
                                
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </Card.Body>
                </Card>  
            </Col>
        </Row>
  )
};

export default Cryptos;