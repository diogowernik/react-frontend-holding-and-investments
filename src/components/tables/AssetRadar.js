import { data } from 'jquery';
import { Row, Col, Nav, Card, Tab} from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';


const AssetRadar = ({assets_for_radar, assets}) => {
  // datatable options
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 3, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }

  assets = assets.filter(({name})=>(name === 'Stocks' || name === 'REITs'));
  const assets_data = assets.sort((a,b)=>(a.ranking > b.ranking) ? 1 : -1).slice(0,10);
  // filter only categories stocks and reits and Açoes Brasileiras and Fundos Imobiliarios
  assets_for_radar = assets_for_radar.filter(({name})=>(name === 'Stocks' || name === 'REITs' || name === 'Ações Brasileiras' || name === 'Fundos Imobiliários'
  ));

  return (

        <Tab.Container defaultActiveKey="Stocks">
        <Row>
          <Col lg={12}>
          <Card className=" mb-3">
              <Card.Header>
                <Nav variant="pills">   
                    
                    {assets_for_radar.map(({name})=>(
                      <Nav.Item key={name}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                      </Nav.Item>
                    ))}
                                      
                </Nav>
              </Card.Header>
          </Card>
          <Tab.Content>
              {assets_for_radar.map(({name,data})=>(
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
                                  <th>Yield 12m</th>
                                  <th>% from top</th>
                                  <th>% from bottom</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((data)=>(
                                  <tr className='text-center' key={data.id}>
                                    
                                    <td>{data.ticker}</td>
                                    <td>{data.twelve_m_yield}</td>
                                    <td>{data.percentage_top_52w}</td>
                                    {/* if percentage bottom 52w is less than 10 td light blue */}
                                    <td
                                      style={{backgroundColor: data.percentage_bottom_52w < 10 ? '#d1ecf1' : ''}}
                                    >{data.percentage_bottom_52w}</td>

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

export default AssetRadar;