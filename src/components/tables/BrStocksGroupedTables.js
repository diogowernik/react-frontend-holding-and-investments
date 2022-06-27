import { Row, Col, Nav, Card, Tab} from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';


const GroupedTables = ({grouped_assets}) => {

  // options for the datatable
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 10, "desc" ]],
    "dom": '<"float-left"f><"clear">',
  }
    


  return (

        <Tab.Container defaultActiveKey="Agro">
        <Row>
          <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">    
                    {grouped_assets.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              {grouped_assets.map(({name,data})=>(
                <Tab.Pane eventKey={name} key={name}>
                  <Row>
                  <Col lg={12}>
                      <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left'>
                          {name}
                          </h5>
                          <h5 className='float-right'>
                          Total: {data.reduce((acc,{total_today_brl})=>(acc+total_today_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </h5>
                        </Card.Header>
                        <Card.Body>
                            <Datatable className="table-responsive" options={options1}>
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr>                              
                                  <th>Ticker</th>
                                  <th>Qnt</th>
                                  <th>PM</th>
                                  <th>Cotação</th>
                                  <th>Custo Total</th>
                                  <th>Total Hoje</th>
                                  <th>Trade</th>
                                  <th>Dividendos</th>
                                  <th>Lucro Total</th>
                                  <th>P/VPA</th>
                                  <th>yield 12m</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({id, ticker, shares_amount, share_average_price_brl, total_cost_brl ,total_today_brl, profit, trade_profit, dividends_profit, asset_price, p_vpa_br_stocks, twelve_m_yield_br_stocks })=>(
                                  <tr key={id}>
                                    
                                    <td>{ticker}</td>
                                    <td>{shares_amount}</td>
                                    <td>{share_average_price_brl}</td>
                                    <td>{asset_price}</td>
                                    <td>{total_cost_brl}</td>
                                    <td>{total_today_brl}</td>
                                    <td>{trade_profit}</td>
                                    <td>{dividends_profit}</td>
                                    <td
                                    className={profit>0?'text-success':'text-danger'}
                                    >{profit}</td>
                                    <td
                                    style={p_vpa_br_stocks>3?{backgroundColor:''}:{backgroundColor:'lightblue'}}
                                    >{p_vpa_br_stocks}</td>
                                    <td
                                    style={twelve_m_yield_br_stocks<8?{backgroundColor:''}:{backgroundColor:'lightblue'}}
                                    >{twelve_m_yield_br_stocks}</td>
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

  )
};

export default GroupedTables;