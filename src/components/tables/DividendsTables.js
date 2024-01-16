import { Row, Col, Nav, Card, Tab } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';

const DividendsTables = ({currency, year_dividends, month_dividends}) => {
  const last_12_months_dividends = month_dividends.slice(0,12)
  const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  const options1 = {
    'paging': true, 
    'ordering': true, 
    'info': false,
    "order": [[ 4, "asc" ]],
    "pageLength": 50,
    "dom": '<"float-left"f><"clear">',
  }

  return (
    <>
      <Tab.Container defaultActiveKey="">
        <Row>
          <Col lg={12}>
            <Card className=" mb-3">
              <Card.Header>
                <h4>Dividendos</h4>
                </Card.Header>
              <Card.Body>
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Year</th>
                      {months.map((month) => (
                        <th key={month}>{month}</th>
                      ))}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {year_dividends.map(({ name, data }) => (
                    <tr key={name}>
                      <td>{name}</td>
                      {months.map((month) => (
                        <td key={month + name}>
                          {data
                            .filter(({ pay_date_by_month_year }) => pay_date_by_month_year === `${month}/${name}`)
                            .reduce((acc, { [`total_dividend_${currency}`]: total_dividend }) => (acc + total_dividend), 0)
                            .toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                        </td>
                      ))}
                      <td>
                        {data.reduce((acc, { [`total_dividend_${currency}`]: total_dividend }) => (acc + total_dividend), 0).toLocaleString(
                          'pt-BR',
                          { maximumFractionDigits: 0 }
                        )}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    {last_12_months_dividends.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              {last_12_months_dividends.map(({name,data})=>(
                <Tab.Pane eventKey={name} key={name}>
                  <Row>
                    <Col lg={12}>
                    <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left'>
                          {name}
                          </h5>
                          <h5 className='float-right'>
                          Total: {data.reduce((acc, dividend) => (acc + dividend[`total_dividend_${currency.toLowerCase()}`]), 0).toLocaleString('pt-BR', { style: 'currency', currency: `${currency.toUpperCase()}` })}
                          </h5>
                        </Card.Header>
                        <Card.Body>
                            <Datatable className="table-responsive" options={options1}>
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr>
                                <th>Ticker</th>
                                <th>Categoria</th>
                                <th>Data Com</th>
                                <th>Data Pg</th>
                                <th>Quotas</th>
                                <th>PM</th>
                                <th>Dividendos Total</th>
                                <th>Dividendo</th>
                                <th>YoC</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((dividend) => (
                                <tr key={dividend.id}>
                                  <td>{dividend.ticker}</td>
                                  <td>
                                    <span className="badge badge-pill badge-primary">{dividend.category}</span>
                                  </td>
                                  <td>
                                    {dividend.record_date}
                                  </td>
                                  <td>{dividend.pay_date}</td>
                                  <td>{dividend.shares_amount}</td>
                                  <td>{dividend[`average_price_${currency}`]}</td>
                                  <td>{dividend[`total_dividend_${currency}`]}</td>
                                  <td>{(dividend[`value_per_share_${currency}`]).toFixed(2)}</td>
                                  <td>{(dividend[`yield_on_cost_${currency}`] * 100).toFixed(2)}</td>
                                </tr>
                                ))}
                              </tbody>
                            </table>
                            </Datatable>
                        </Card.Body>
                    </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
              ))}       
          </Tab.Content>
          </Col>
        </Row>
        </Tab.Container>
        
       
    </>
  )
};

export default DividendsTables;