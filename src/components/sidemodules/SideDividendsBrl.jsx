import { Card, Table } from 'react-bootstrap';
import React from 'react';

const SideDividends = ({ total_dividends_brl }) => {
    return (
        <>
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Dividendos</h4>           
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {total_dividends_brl.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td>
                                      <span className="float-right">
                                        {dividend.total_dividend_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                     {total_dividends_brl.reduce((acc, dividend) => acc + dividend.total_dividend_brl, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>      
                </Card.Body>
          </Card>            
        </>     
    )
};

export default SideDividends;




