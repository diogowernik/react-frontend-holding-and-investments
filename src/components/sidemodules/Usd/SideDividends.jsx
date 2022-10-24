import { Card, Table } from 'react-bootstrap';
import AuthContext from '../../../contexts/AuthContext';
import { fetchPortfolioDividends} from '../../../apis';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import { dividends_total_usd_by } from '../../../group_functions';

const SideDividends = () => {
    const [portfolio_dividends, setPortfolioDividends] = useState([]);

    const auth = useContext(AuthContext);
    const params = useParams();

    const onFetchPortfolioDividends = useCallback(async () => {
      const json = await fetchPortfolioDividends(params.id, auth.token);
      if (json) {
          setPortfolioDividends(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioDividends();
      }, [onFetchPortfolioDividends]);

    const total_dividends_by_category = dividends_total_usd_by(portfolio_dividends,"category")
    
    const dividends_sum = total_dividends_by_category.reduce((acc, dividend) => acc + dividend.total_dividend_usd, 0)
    const dividends_order = total_dividends_by_category.sort((a, b) => b.total_dividend_usd - a.total_dividend_usd);
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
                                      U$ {dividend.total_dividend_usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                      </span>
                                      {/* percentage */}
                                      <span className="text-muted ml-2">
                                        {/* dividend.total/ dividends_sum */}
                                        ( {((dividend.total_dividend_usd / dividends_sum) * 100).toFixed(2)} % )
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                    U$ {dividends_sum.toLocaleString('en-US', { maximumFractionDigits: 2 })}
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




