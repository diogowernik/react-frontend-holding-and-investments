import { Card, Tab} from 'react-bootstrap';


const DividendsTable = ({ portfolio_dividends }) => {

  const total_dividend_brl = portfolio_dividends.reduce((acc, {total_dividend_brl}) => acc + total_dividend_brl, 0);
  const total_dividend_usd = portfolio_dividends.reduce((acc, {total_dividend_usd}) => acc + total_dividend_usd, 0);


  return (

        <>
        <Tab.Pane eventKey="dividends">
          <Card>
            <Card.Body>
              {console.log(portfolio_dividends)}
              <h5 className='float-left'>
                Dividendos
                |
                Total Brl: {total_dividend_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                |
                Total Usd: {total_dividend_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
              </h5>
              <table id="dividends" className="table table-striped table-bordered" style={{width: "100%"}}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Ticker</th>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Record Date</th>
                    <th>Pay Date</th>
                    <th>Shares Amount</th>
                    <th>Average Price Brl</th>
                    <th>Average Price Usd</th>
                    <th>Total Dividend Brl</th>
                    <th>Total Dividend Usd</th>
                    <th>Value per share Brl</th>
                    <th>Value per share Usd</th>
                    <th>Yield on Cost</th>
                    <th>Usd on pay date</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio_dividends.map((portfolio_dividend) => (
                    <tr key={portfolio_dividend.id}>
                      <td>{portfolio_dividend.id}</td>
                      <td>{portfolio_dividend.ticker}</td>
                      <td>{portfolio_dividend.category}</td>
                      <td>{portfolio_dividend.subcategory}</td>
                      <td>{portfolio_dividend.record_date}</td>
                      <td>{portfolio_dividend.pay_date}</td>
                      <td>{portfolio_dividend.shares_amount}</td>
                      <td>{portfolio_dividend.average_price_brl}</td>
                      <td>{portfolio_dividend.average_price_usd}</td>
                      <td>{portfolio_dividend.total_dividend_brl}</td>
                      <td>{portfolio_dividend.total_dividend_usd}</td>
                      <td>{portfolio_dividend.value_per_share_brl}</td>
                      <td>{portfolio_dividend.value_per_share_usd}</td>
                      <td>{portfolio_dividend.yield_on_cost}</td>
                      <td>{portfolio_dividend.usd_on_pay_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Tab.Pane>
      </>
  )
};

export default DividendsTable;