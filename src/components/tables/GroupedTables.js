import { Row, Col, Nav, Card, Tab} from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';


const GroupedTables = ({grouped_assets}) => {


  return (

        <Tab.Container defaultActiveKey="dashboard">
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
                            <Datatable className="table-responsive">
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr>                              
                                  <th>Ticker</th>
                                  <th>Quantidade</th>
                                  <th>Preço Médio</th>
                                  <th>Custo Total</th>
                                  <th>Total Hoje</th>
                                  <th>Lucro</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({id, ticker, shares_amount, share_average_price_brl, total_cost_brl ,total_today_brl, profit, broker, category})=>(
                                  <tr key={id}>
                                    
                                    <td>{ticker}</td>
                                    <td>{shares_amount}</td>
                                    <td>{share_average_price_brl}</td>
                                    <td>{total_cost_brl}</td>
                                    <td>{total_today_brl}</td>
                                    <td>{profit}</td>
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