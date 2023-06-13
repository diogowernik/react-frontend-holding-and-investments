import { Row, Col, Card } from 'react-bootstrap';
import Datatable from '../../contexts/Datatable';

const CommonTable = ({data}) => {
  // datatable options
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 3, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }
  
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
                        <th>Ticker</th>
                        <th>Preço em Reais</th>
                        <th>Preço em Dólares</th>
                        <th>Yield 12m</th>
                        <th>p/vpa</th>
                        <th>% from top</th>
                        <th>% from bottom</th>
                        <th>Setor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data)=>(
                        <tr className='text-center' key={data.id}>
                          <td>{data.ticker}</td>
                          <td>{data.price_brl}</td>
                          <td>{data.price_usd}</td>
                          <td>{data.twelve_m_yield}</td>
                          <td>{data.p_vpa}</td>
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

export default CommonTable;

   
 