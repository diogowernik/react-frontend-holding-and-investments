import { Card, Table } from 'react-bootstrap';
import AuthContext from '../../contexts/AuthContext';
import { fetchPortfolioDividends} from '../../apis';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import { dividends_total_by } from '../../group_functions';

const SideDividendsTemplate = ({currency}) => {
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

    const total_dividends_by_category = dividends_total_by(portfolio_dividends,"category")
    
    const dividends_sum = total_dividends_by_category.reduce((acc, dividend) => acc + dividend["total_dividend_"+currency], 0)
    const dividends_order = total_dividends_by_category.sort((a, b) => b["total_dividend_"+currency] - a["total_dividend_"+currency]);
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
                                        {dividend["total_dividend_"+currency] ? dividend["total_dividend_"+currency].toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() }) : 0}
                                      </span>
                                      {/* percentage */}
                                      <span className="text-muted ml-2">
                                        ( {((dividend["total_dividend_"+currency] / dividends_sum) * 100).toFixed(2)} % )
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                      {dividends_sum.toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() })}
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

export default SideDividendsTemplate;