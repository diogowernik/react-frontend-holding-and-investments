import { Row, Col, Nav, Card, Tab} from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';
import BrStocksRadar from './BrStocksRadar';


const BrStocksGroupedRadar = ({br_stocks_for_radar, br_stocks}) => {
  // datatable options
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 8, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }

  return (

        <Tab.Container defaultActiveKey="Energia">
        <Row>
          <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">
                    <Nav.Item key="top-10">
                        <Nav.Link eventKey="top-10">Top 10</Nav.Link>
                    </Nav.Item>       
                    {br_stocks_for_radar.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}                    
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              <Tab.Pane eventKey="top-10">
                <BrStocksRadar
                  br_stocks={br_stocks}
                />
              </Tab.Pane>
              {br_stocks_for_radar.map(({name,data})=>(
                <Tab.Pane eventKey={name} key={name}>
                  <Row>
                  <Col lg={12}>
                      <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left'>
                          {name}
                          </h5>
                        </Card.Header>
                        <Card.Body>
                            <Datatable className="table-responsive" options={options1} >
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr className='text-center'>                              
                                  <th>Ticker</th>
                                  <th>Cotação</th>                                 
                                  <th>Yield 12m</th>
                                  <th>P/VPA</th>                                 
                                  <th>P/L</th>
                                  <th>ROE</th>
                                  <th
                                  // className={name === 'Bancos' ? 'd-none' : ''}
                                  >EV/EBIT</th>
                                  <th
                                  // className={name === 'Bancos' ? 'd-none' : ''}
                                  >ROIC</th>
                                  <th>Ranking</th>
                                  {/* <th>Ranking All</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({id, ticker, price, p_vpa, twelve_m_yield, ev_ebit, roic, pl, roe, ranking, ranking_all})=>(
                                  <tr className='text-center' key={id}>
                                    
                                    <td>{ticker}</td>
                                    <td>{price}</td>
                                    <td
                                      style={twelve_m_yield < 8 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}                                    
                                    >{twelve_m_yield}</td>
                                    <td
                                      style={p_vpa > 3 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}
                                    >{p_vpa}</td>
                                    <td
                                      style={pl < 7 ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                    >{pl}</td>
                                    <td
                                      style={roe > 12 ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                    >{roe}</td>
                                    <td
                                      // if ev_ebit between 0 and 1, then color is lightblue
                                      style={ev_ebit < 7  ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                      // className={name === 'Bancos' ? 'd-none' : ''}
                                    >{ev_ebit}</td>
                                    <td
                                      style={roic > 12 ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                      // className={name === 'Bancos' ? 'd-none' : ''}
                                    >{roic}</td>
                                    {/* <td>{ranking}</td> */}
                                    <td>{ranking_all}</td>

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

export default BrStocksGroupedRadar;