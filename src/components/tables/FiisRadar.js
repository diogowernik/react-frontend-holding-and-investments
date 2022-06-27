import { Row, Col, Card} from 'react-bootstrap';

const FiisRadar = ({fiis}) => {
  const data = fiis.sort((a,b)=>(a.ranking > b.ranking) ? 1 : -1).slice(0,10);
  return (

        <Row>
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <Card  color="gray" className="mb-3">   
                  <Card.Header className="bg-gray-lighter">
                    <h5 className='float-left'>
                    Top 10
                    </h5>
                  </Card.Header>
                  <Card.Body>
                      {/* <Datatable className="table-responsive" > */}
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
                  </Card.Body>
                </Card>  
              </Col> 
            </Row>
          </Col>
        </Row>

  )
};

export default FiisRadar;