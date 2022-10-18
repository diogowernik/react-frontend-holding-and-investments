import { Card, Table} from 'react-bootstrap';
import React from 'react';

const SideDividends = ({ total_dividends_usd }) => {
    return (
        <>
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Dividends</h4>                  
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                        <tbody>
                            {/* map total_dividends_usd */} 
                            {total_dividends_usd.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td>
                                      <span className="float-right">
                                         {dividend.total_dividend_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                    {total_dividends_usd.reduce((acc, dividend) => acc + dividend.total_dividend_usd, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
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




