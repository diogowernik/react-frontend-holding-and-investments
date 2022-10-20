import { Card, Table } from 'react-bootstrap';
import React from 'react';

const SideDividends = ({ total_dividends_brl }) => {
    const dividends_sum = total_dividends_brl.reduce((acc, dividend) => acc + dividend.total_dividend_brl, 0)
    const dividends_order = total_dividends_brl.sort((a, b) => b.total_dividend_brl - a.total_dividend_brl);
    return (
        <>
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Dividendos</h4>           
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {dividends_order.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td className='text-right mr-2'>
                                      <span>
                                        {dividend.total_dividend_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                      </span>
                                      {/* percentage */}
                                      <span className="text-muted ml-2">
                                        {/* dividend.total/ dividends_sum */}
                                        ( {((dividend.total_dividend_brl / dividends_sum) * 100).toFixed(2)} % )
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                     {dividends_sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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




