import { Row, Col, Nav, Card, Tab} from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';
import FiisRadar from './FiisRadar';


const GroupedRadar = ({fiis_for_radar, fiis}) => {
  // datatable options
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 6, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }

  return (

        <Tab.Container defaultActiveKey="top-10">
        <Row>
          <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">   
                    <Nav.Item key="top-10">
                        <Nav.Link eventKey="top-10">Top 10</Nav.Link>
                    </Nav.Item>   
                    {fiis_for_radar.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                                      
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              <Tab.Pane eventKey="top-10">
                <FiisRadar
                  fiis={fiis}
                />
              </Tab.Pane>
              {fiis_for_radar.map(({name,data})=>(
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
                                  <th>Ultimo Yield</th>
                                  <th>Yield 6m</th>
                                  <th>Yield 12m</th>
                                  <th>P/VPA</th>
                                  <th>Ranking</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({id, ticker, price, p_vpa, last_yield, six_m_yield, twelve_m_yield, ranking})=>(
                                  <tr className='text-center' key={id}>
                                    
                                    <td>{ticker}</td>
                                    <td>{price}</td>
                                    <td
                                      style={last_yield < 0.7 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}
                                    >{last_yield}</td>
                                    <td
                                      style={six_m_yield < 4 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}
                                    >{six_m_yield}</td>
                                    <td
                                      style={twelve_m_yield < 8 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}                                    
                                    >{twelve_m_yield}</td>
                                    <td
                                      style={p_vpa > 1.05 ? {backgroundColor: ''} : {backgroundColor: 'lightblue'}}
                                    >{p_vpa}</td>
                                    <td>{ranking}</td>
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

export default GroupedRadar;