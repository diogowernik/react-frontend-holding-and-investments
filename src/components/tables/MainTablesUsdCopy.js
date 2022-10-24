import { Row, Col, Nav, Card, Tab, Button, Modal } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {  removePortfolioAsset } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import PortfolioAssetForm  from '../../containers/PortfolioAssetForm';

const GroupedTables = ({grouped_assets}) => {
  const [portfolioAssetFormShow, setPortfolioAssetFormShow] = useState(false);
  const [Asset, setAsset] = useState(null);

  const showModal = () => setPortfolioAssetFormShow(true);
  const hideModal = () => setPortfolioAssetFormShow(false);

  const auth = useContext(AuthContext);

  const onRemoveAsset = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePortfolioAsset(id, auth.token).then(
        console.log("removed, need to refresh, but not implemented yet")
      );
      // solução tabajara
      window.location.reload();
    }
  }

  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 3, "asc" ]],
    "dom": '<"float-left"f><"clear">',
  }

  return (
    <>
        <Tab.Container defaultActiveKey="">
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
                          <h5 className='float-left mt-2'>
                          {name}
                          </h5>
                        </Card.Header>
                        <Card.Body>
                            <Datatable className="table-responsive" options={options1}>
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr>                              
                                  <th>Ticker</th>
                                  <th>Cotação</th>
                                  <th>Qnt</th>
                                  <th>Valor</th>
                                  <th>Custo</th>
                                  <th>PM</th>
                                  <th>Prov.</th>
                                  <th>PM-d</th>
                                  <th>YoC</th>
                                  <th>Lucro</th>
                                  <th>%R</th>
                                  <th>%R-d-t</th>
                                  <th>%P</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((asset) => (  
                                  asset.shares_amount > 0 && (
                                  <tr key={asset.id}>
                                    <td>{asset.ticker}</td>
                                    <td>{asset.asset_price_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.shares_amount}</td>
                                    <td>{asset.total_today_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.total_cost_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.share_average_price_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.dividends_profit_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.av_price_minus_div_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{asset.yield_on_cost_usd.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>{asset.total_profit_usd}</td>     
                                    <td className={asset.profit_without_div_trade_usd>0?'text-primary':'text-warning'}>{asset.profit_without_div_trade_usd.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>   
                                    <td className={asset.profit_with_div_trade_usd>0?'text-primary':'text-warning'}>{asset.profit_with_div_trade_usd.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>{asset.portfolio_percentage.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '80px'} }>
                                      <Button variant="link" 
                                        onClick={()=>{
                                          setAsset(asset);
                                          showModal();
                                        }}
                                      >
                                        <AiOutlineEdit size={20} color="blue" />
                                      </Button>|<Button variant="link" onClick={() => onRemoveAsset(asset.id)}>
                                        <AiOutlineDelete size={20} color="red" />
                                      </Button>
                                    </td>
                                  </tr>
                                  )
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
        <Modal show={portfolioAssetFormShow} onHide={hideModal}>
          <Modal.Header closeButton>
            {/* asset name */}
            <Modal.Title>Editar {Asset?.ticker}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PortfolioAssetForm asset={Asset} onHide={hideModal} />
          </Modal.Body>
        </Modal>
      </>
  )
};

export default GroupedTables;