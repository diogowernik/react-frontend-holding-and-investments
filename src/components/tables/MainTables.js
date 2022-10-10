import { Row, Col, Nav, Card, Tab, Button, Modal } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {  removePortfolioAsset } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import PortfolioAssetForm  from '../../containers/PortfolioAssetForm';
import { AiFillEyeInvisible } from 'react-icons/ai';

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
  // sum of all grouped_assets
  // const total = grouped_assets.reduce((acc, asset) => acc + asset.shares_amount * asset.asset_price, 0);


  // options for the datatable
  const options1 = {
    'paging': false, // Table pagination
    'ordering': true, // Column ordering
    'info': false, // Bottom left status text
    "order": [[ 5, "asc" ]],
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
                    <Tab.Container defaultActiveKey="hide">
                      <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left mt-2'>
                          {name}
                          </h5>
                          <Nav variant="pills" className='float-right'>    
                            <Nav.Item>
                                <Nav.Link eventKey="BRL">BRL</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="USD">USD</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="hide">
                                    <AiFillEyeInvisible 
                                        size={25}
                                    />     
                                </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Card.Header>
                        <Card.Body>
                          <Tab.Content>
                            <Tab.Pane eventKey="BRL" >
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
                                {data.map(({
                                  id,
                                  ticker,
                                  shares_amount,
                                  asset_price,
                                  share_average_price_brl,
                                  share_average_price_usd,
                                  total_cost_brl,
                                  total_cost_usd,
                                  total_today_brl,
                                  total_today_usd,
                                  category,
                                  subcategory,
                                  total_profit_brl,
                                  dividends_profit_brl,
                                  dividends_profit_usd,
                                  trade_profit_brl,
                                  trade_profit_usd,
                                  broker,
                                  twelve_m_yield,
                                  twelve_m_dividend,
                                  p_vpa,
                                  av_price_brl_minus_div_brl,
                                  portfolio_percentage,
                                  yield_on_cost,
                                  profit_without_div_trade,
                                  profit_with_div_trade,
                                 })=>(
                                  // hide if shares_amount == 0
                                  shares_amount > 0 && (
                                  <tr key={id}>
                                    <td>{ticker}</td>
                                    <td>{asset_price}</td>
                                    <td>{shares_amount}</td>
                                    <td>{total_today_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{total_cost_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{share_average_price_brl}</td>
                                    <td>{dividends_profit_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{av_price_brl_minus_div_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{yield_on_cost.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td className={total_profit_brl>0?'text-primary':'text-warning'}>{total_profit_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>         
                                    <td className={profit_without_div_trade>0?'text-primary':'text-warning'}>{profit_without_div_trade.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>   
                                    <td className={profit_with_div_trade>0?'text-primary':'text-warning'}>{profit_with_div_trade.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>{portfolio_percentage.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '80px'} }>
                                      <Button variant="link" 
                                        onClick={()=>{setAsset({
                                          id,
                                          ticker,
                                          shares_amount,
                                          asset_price,
                                          share_average_price_brl,
                                          share_average_price_usd,
                                          total_cost_brl,
                                          total_cost_usd,
                                          total_today_brl,
                                          total_today_usd,
                                          category,
                                          subcategory,
                                          total_profit_brl,
                                          dividends_profit_brl,
                                          dividends_profit_usd,
                                          trade_profit_brl,
                                          trade_profit_usd,
                                          broker,
                                          twelve_m_yield,
                                          twelve_m_dividend,
                                          p_vpa,
                                          av_price_brl_minus_div_brl,
                                          portfolio_percentage,
                                          yield_on_cost,
                                          profit_without_div_trade,
                                          profit_with_div_trade,
                                         }); 
                                        showModal();}}
                                      >
                                        <AiOutlineEdit size={20} color="blue" />
                                      </Button>|<Button variant="link" onClick={() => onRemoveAsset(id)}>
                                        <AiOutlineDelete size={20} color="red" />
                                      </Button>
                                    </td>
                                  </tr>
                                  )
                                ))}
                              </tbody>
                            </table>
                            </Datatable>
                            <div className="float-right">
                            Total: {data.reduce((acc,{total_today_brl})=>(acc+total_today_brl),0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="USD" >
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
                                {data.map(({
                                  id,
                                  ticker,
                                  shares_amount,
                                  asset_price,
                                  share_average_price_brl,
                                  share_average_price_usd,
                                  total_cost_brl,
                                  total_cost_usd,
                                  total_today_brl,
                                  total_today_usd,
                                  category,
                                  subcategory,
                                  total_profit_brl,
                                  dividends_profit_brl,
                                  dividends_profit_usd,
                                  trade_profit_brl,
                                  trade_profit_usd,
                                  broker,
                                  twelve_m_yield,
                                  twelve_m_dividend,
                                  p_vpa,
                                  av_price_brl_minus_div_brl,
                                  portfolio_percentage,
                                  yield_on_cost,
                                  profit_without_div_trade,
                                  profit_with_div_trade,
                                 })=>(
                                  // hide if shares_amount == 0
                                  shares_amount > 0 && (
                                  <tr key={id}>
                                    <td>{ticker}</td>
                                    <td></td> {/* asset_price_usd create on backend */}
                                    <td>{shares_amount}</td>
                                    <td>{total_today_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</td>
                                    <td></td> {/* total_cost_usd exist need to calculate on backend*/}
                                    <td></td> {/* share_average_price_usd exist need to calculate on backend*/}
                                    <td>{dividends_profit_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>         
                                    <td></td>   
                                    <td></td>
                                    <td>{portfolio_percentage.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '80px'} }>
                                      <Button variant="link" 
                                        onClick={()=>{setAsset({
                                          id,
                                          ticker,
                                          shares_amount,
                                          asset_price,
                                          share_average_price_brl,
                                          share_average_price_usd,
                                          total_cost_brl,
                                          total_cost_usd,
                                          total_today_brl,
                                          total_today_usd,
                                          category,
                                          subcategory,
                                          total_profit_brl,
                                          dividends_profit_brl,
                                          dividends_profit_usd,
                                          trade_profit_brl,
                                          trade_profit_usd,
                                          broker,
                                          twelve_m_yield,
                                          twelve_m_dividend,
                                          p_vpa,
                                          av_price_brl_minus_div_brl,
                                          portfolio_percentage,
                                          yield_on_cost,
                                          profit_without_div_trade,
                                          profit_with_div_trade,
                                         }); 
                                        showModal();}}
                                      >
                                        <AiOutlineEdit size={20} color="blue" />
                                      </Button>|<Button variant="link" onClick={() => onRemoveAsset(id)}>
                                        <AiOutlineDelete size={20} color="red" />
                                      </Button>
                                    </td>
                                  </tr>
                                  )
                                ))}
                              </tbody>
                            </table>
                            </Datatable>
                            </Tab.Pane>

                            <Tab.Pane eventKey="hide" >
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
                                {data.map(({
                                  id,
                                  ticker,
                                  shares_amount,
                                  asset_price,
                                  share_average_price_brl,
                                  share_average_price_usd,
                                  total_cost_brl,
                                  total_cost_usd,
                                  total_today_brl,
                                  total_today_usd,
                                  category,
                                  subcategory,
                                  total_profit_brl,
                                  dividends_profit_brl,
                                  dividends_profit_usd,
                                  trade_profit_brl,
                                  trade_profit_usd,
                                  broker,
                                  twelve_m_yield,
                                  twelve_m_dividend,
                                  p_vpa,
                                  av_price_brl_minus_div_brl,
                                  portfolio_percentage,
                                  yield_on_cost,
                                  profit_without_div_trade,
                                  profit_with_div_trade,
                                 })=>(
                                  // hide if shares_amount == 0
                                  shares_amount > 0 && (
                                  <tr key={id}>
                                    <td>{ticker}</td>
                                    <td>{asset_price}</td>
                                    <td>***</td>
                                    <td>***</td>
                                    <td>***</td>
                                    <td>{share_average_price_brl}</td>
                                    <td>***</td>
                                    <td>{av_price_brl_minus_div_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{yield_on_cost.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>***</td>         
                                    <td className={profit_without_div_trade>0?'text-primary':'text-warning'}>{profit_without_div_trade.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>   
                                    <td className={profit_with_div_trade>0?'text-primary':'text-warning'}>{profit_with_div_trade.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>{portfolio_percentage.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '80px'} }>
                                      <Button variant="link" 
                                        onClick={()=>{setAsset({
                                          id,
                                          ticker,
                                          shares_amount,
                                          asset_price,
                                          share_average_price_brl,
                                          share_average_price_usd,
                                          total_cost_brl,
                                          total_cost_usd,
                                          total_today_brl,
                                          total_today_usd,
                                          category,
                                          subcategory,
                                          total_profit_brl,
                                          dividends_profit_brl,
                                          dividends_profit_usd,
                                          trade_profit_brl,
                                          trade_profit_usd,
                                          broker,
                                          twelve_m_yield,
                                          twelve_m_dividend,
                                          p_vpa,
                                          av_price_brl_minus_div_brl,
                                          portfolio_percentage,
                                          yield_on_cost,
                                          profit_without_div_trade,
                                          profit_with_div_trade,
                                         }); 
                                        showModal();}}
                                      >
                                        <AiOutlineEdit size={20} color="blue" />
                                      </Button>|<Button variant="link" onClick={() => onRemoveAsset(id)}>
                                        <AiOutlineDelete size={20} color="red" />
                                      </Button>
                                    </td>
                                  </tr>
                                  )
                                ))}
                              </tbody>
                            </table>
                            </Datatable>
                            </Tab.Pane>
                          </Tab.Content>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
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