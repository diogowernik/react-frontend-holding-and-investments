import { Row, Col, Nav, Card, Tab } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';

const DividendsTables = ({year_dividends}) => {
  const options1 = {
    'paging': true, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 3, "asc" ]],
    "pageLength": 25,
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
                      <th>01</th>
                      <th>02</th>
                      <th>03</th>
                      <th>04</th>
                      <th>05</th>
                      <th>06</th>
                      <th>07</th>
                      <th>08</th>
                      <th>09</th>
                      <th>10</th>
                      <th>11</th>
                      <th>12</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {year_dividends.map(({name,data})=>(
                      <tr key={name}>
                        <td>{name}</td>                        
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `01/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `02/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `03/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `04/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `05/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `06/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `07/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `08/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `09/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `10/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `11/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td> {data.filter(({pay_date_by_month_year})=>pay_date_by_month_year === `12/${name}`).reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </td>
                        <td>{data.reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    {year_dividends.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              {year_dividends.map(({name,data})=>(
                <Tab.Pane eventKey={name} key={name}>
                  <Row>
                    <Col lg={12}>
                    <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left'>
                          {name}
                          </h5>
                          <h5 className='float-right'>
                          Total: {data.reduce((acc,{total_dividend_brl})=>(acc+total_dividend_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </h5>
                        </Card.Header>
                        <Card.Body>
                            <Datatable className="table-responsive" options={options1}>
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr>
                                  {/* display hidden */}
                                <th>Ticker</th>
                                <th>Record Date</th>
                                <th>Pay Date</th>
                                <th>Shares Amount</th>
                                <th>Average Price Brl</th>
                                <th>Total Dividend Brl</th>
                                <th>Value per share Brl</th>
                                <th>Yield on Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((dividend) => (
                                <tr key={dividend.id}>
                                  <td>{dividend.ticker}</td>
                                  <td>{dividend.record_date}</td>
                                  <td>{dividend.pay_date}</td>
                                  <td>{dividend.shares_amount}</td>
                                  <td>{dividend.average_price_brl}</td>
                                  <td>{dividend.total_dividend_brl}</td>
                                  <td>{dividend.value_per_share_brl}</td>
                                  <td>{dividend.yield_on_cost}</td>
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