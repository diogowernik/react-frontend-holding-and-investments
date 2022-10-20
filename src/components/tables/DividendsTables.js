import { Row, Col, Nav, Card, Tab } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';

const DividendsTables = ({dividends_category}) => {
  const options1 = {
    'paging': true, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 3, "asc" ]],
    // show 25 rows
    "pageLength": 25,
    // "dom": '<"float-left"f><"clear">',
  }
  // console.log(dividends_category);

  return (
    <>
        <Tab.Container defaultActiveKey="FII">
        <Row>
          <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    {dividends_category.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              {dividends_category.map(({name,data})=>(
                <Tab.Pane eventKey={name} key={name}>
                  <Row>
                    <Col lg={12}>
                    <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left'>
                          {name}
                          </h5>
                          <h5 className='float-right'>
                          {/* Total: {data.reduce((acc,{total_today_brl})=>(acc+total_today_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} */}
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
                                <th>Average Price Usd</th>
                                <th>Total Dividend Brl</th>
                                <th>Total Dividend Usd</th>
                                <th>Value per share Brl</th>
                                <th>Value per share Usd</th>
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
                                  <td>{dividend.average_price_usd}</td>
                                  <td>{dividend.total_dividend_brl}</td>
                                  <td>{dividend.total_dividend_usd}</td>
                                  <td>{dividend.value_per_share_brl}</td>
                                  <td>{dividend.value_per_share_usd}</td>
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