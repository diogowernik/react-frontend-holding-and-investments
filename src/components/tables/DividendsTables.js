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
                                  <th>Ticker</th>
                                  <th>Tipo</th>
                                  <th>Record Date</th>
                                  <th>Pay Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(({id,ticker,subcategory,record_date,pay_date})=>(
                                  <tr key={id}>
                                    <td>{ticker}</td>
                                    <td>{subcategory}</td>
                                    <td>{record_date}</td>
                                    <td>{pay_date}</td>
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