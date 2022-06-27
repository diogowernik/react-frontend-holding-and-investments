import { Row, Col, Card} from 'react-bootstrap';

const BrStocksRadar = ({br_stocks}) => {
  const data = br_stocks.sort((a,b)=>(a.ranking > b.ranking) ? 1 : -1);
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
                          <th>Yield 12m</th>
                          <th>P/VPA</th>                                 
                          <th>P/L</th>
                          <th>ROE</th>
                          {/* <th
                          // className={name === 'Bancos' ? 'd-none' : ''}
                          >EV/EBIT</th>
                          <th
                          // className={name === 'Bancos' ? 'd-none' : ''}
                          >ROIC</th> */}
                          <th>Ranking</th>
                          {/* <th>Ranking All</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {data.map(({id, ticker, price, p_vpa, twelve_m_yield, ev_ebit, roic, pl, roe, ranking})=>(
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
                              {/* <td
                                // if ev_ebit between 0 and 1, then color is lightblue
                                style={ev_ebit < 7  ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                // className={name === 'Bancos' ? 'd-none' : ''}
                              >{ev_ebit}</td>
                              <td
                                style={roic > 12 ? {backgroundColor: 'lightblue'} : {backgroundColor: ''}}
                                // className={name === 'Bancos' ? 'd-none' : ''}
                              >{roic}</td> */}
                              {/* <td>{ranking}</td> */}
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

export default BrStocksRadar;