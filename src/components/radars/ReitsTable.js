import { Row, Col, Card } from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';

const BrStocksTable = ({data}) => {
  // datatable options
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    // "order": [[ 1, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }

  // Filter is_radar = true
  data = data.filter((data) => data.is_radar === true);

  
  return (
    <Row>
      <Col lg={12}>
        <Card color="gray" className="mb-3">   
          <Card.Header className="bg-gray-lighter">

          </Card.Header>
          <Card.Body>

            {data && data.length > 0 && (
              <Datatable className="table-responsive" options={options1} >
                <table className="table table-striped table-sm">
                <thead>
                      <tr className='text-center'>  
                        <th>Ranking</th>                            
                        <th>Ticker</th>
                        <th>BRL</th>
                        <th>USD</th>
                        <th>Yield 12m</th>
                        <th>% topo</th>
                        <th>% fundo</th>
                        <th>Setor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data)=>(
                        <tr className='text-center' key={data.id}>
                          <td>{data.ranking}</td>
                          <td>{data.ticker}</td>
                          <td>{data.price_brl}</td>
                          <td>{data.price_usd}</td>
                          <td>{data.twelve_m_yield}</td>
                          <td>{data.percentage_top_52w}</td>
                          <td
                            style={{backgroundColor: data.percentage_bottom_52w < 10 ? '#d1ecf1' : ''}}
                          >{data.percentage_bottom_52w}</td>
                          <td>{data.subcategory}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </Datatable>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};

export default BrStocksTable;

   
 