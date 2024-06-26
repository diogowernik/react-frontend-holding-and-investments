import { Row, Col, Nav, Card, Tab, Button, Modal } from "react-bootstrap";
import Datatable from '../../contexts/Datatable';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {  removePortfolioAsset, updatePortfolioAsset } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import PortfolioAssetForm  from '../../containers/PortfolioAssetForm';

const GroupedTables = ({currency, grouped_assets}) => {
  const [portfolioAssetFormShow, setPortfolioAssetFormShow] = useState(false);
  const [Asset, setAsset] = useState(null);

  // Estado para controlar a edição
  const [editingAssetId, setEditingAssetId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const handleEditClick = (asset) => {
    setEditingAssetId(asset.id);
    setEditFormData({ ...asset });
  };

  
  const handleEditChange = (event, fieldName) => {
    setEditFormData({ ...editFormData, [fieldName]: event.target.value });
  };
  // console.log('onUpdate:', onUpdate);
  
  const handleSave = async () => {
    const updatedData = {
      shares_amount: editFormData.shares_amount,
    };
  
    const json = await updatePortfolioAsset(editingAssetId, updatedData, auth.token);
  
    if (json) {
      console.log("Ativo atualizado com sucesso");

      // Encontrar e atualizar o ativo na lista de assets
      // const newAssets = grouped_assets.map(group => ({
      //   ...group,
      //   data: group.data.map(asset => 
      //     asset.id === editingAssetId ? { ...asset, ...updatedData } : asset
      //   )
      // }));

      // Chamar o callback com os novos dados
      // onUpdate(newAssets);
      // recarregar a página
      window.location.reload();
      

      // Resetar o estado de edição
      setEditingAssetId(null);
      setEditFormData({});
    }
  };
  

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
                    <Tab.Container defaultActiveKey="hide">
                      <Card  color="gray" className="mb-3">   
                        <Card.Header className="bg-gray-lighter">
                          <h5 className='float-left mt-2'> {name} </h5>
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
                                  <th>Div.</th>
                                  <th>Trade</th>
                                  <th>PM-d</th>
                                  <th>YoC</th>
                                  <th>Lucro</th>
                                  <th>%R</th>
                                  <th>%R-d-t</th>
                                  <th>%P</th>
                                  <th>Corretora</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((asset) => (
                                  asset.shares_amount > 0 && (
                                  <tr key={asset.id}>
                                    <td>
                                      <span className="badge badge-primary">
                                      {asset.ticker}
                                      </span>
                                    </td>
                                    <td>{asset[`asset_price_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>

                                    {/* Campo td editável inline */}
                                    {asset.id === editingAssetId ? (
                                      <>
                                        {/* Exemplo para editar a quantidade */}
                                        <td>
                                          <input
                                            type="number"
                                            value={editFormData.shares_amount}
                                            onChange={(e) => handleEditChange(e, "shares_amount")}
                                          />
                                        </td>
                                        {/* Adicionar inputs para outros campos conforme necessário */}
                                        {/* Botão para salvar as alterações */}
                                        <td>
                                          <Button onClick={handleSave}>Salvar</Button>
                                        </td>
                                      </>
                                    ) : (
                                      <>
                                        {/* Exibição normal quando não está editando */}
                                        <td>{asset.shares_amount}
                                          <Button variant="link" onClick={() => handleEditClick(asset)}>
                                            <AiOutlineEdit />
                                          </Button>
                                        </td>
                                      </>
                                    )}




                                    <td>{asset[`total_today_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>
                                    <td>{asset[`total_cost_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>
                                    <td>{asset[`share_average_price_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>
                                    <td className="text-primary">{asset[`dividends_profit_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>
                                    <td className={asset[`trade_profit_${currency}`] > -0.001 ? 'text-primary' : 'text-warn'}>{asset[`trade_profit_${currency}`]}</td>            
                                    <td>{asset[`av_price_minus_div_${currency}`].toLocaleString('pt-br', { style: 'currency', currency: currency })}</td>
                                    <td>{asset[`yield_on_cost_${currency}`].toLocaleString('pt-br', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td className={asset[`total_profit_${currency}`] > -0.001 ? 'text-primary' : 'text-warn'}>{asset[`total_profit_${currency}`]}</td>
                                    <td className={asset[`profit_without_div_trade_${currency}`] > -0.001 ? 'text-primary' : 'text-warn'}>{asset[`profit_without_div_trade_${currency}`].toLocaleString('pt-br', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td className={asset[`profit_with_div_trade_${currency}`] > -0.001 ? 'text-primary' : 'text-warn'}>{asset[`profit_with_div_trade_${currency}`].toLocaleString('pt-br', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>{asset.portfolio_percentage.toLocaleString('pt-br', { style: 'percent', minimumFractionDigits: 2 })}</td>
                                    <td>
                                      <span className="badge badge-success">
                                      {asset.broker}
                                      </span>
                                      
                                    </td>
                                    <td style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '80px'} }>
                                      <Button variant="link" 
                                        // onclick setAsset and show modal
                                        onClick={() => {
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
                            <div className="float-right">
                              
                            Total: {data.reduce((acc, asset) => acc + asset[`total_today_${currency}`], 0).toLocaleString('pt-br', { style: 'currency', currency: currency })}

                            </div>
                            
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
            <Modal.Title>
              Editar {Asset?.ticker}{'\u00A0'} 
              | R$ {Asset?.asset_price_brl}{'\u00A0'}
              | U$ {Asset?.asset_price_usd} 
            
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PortfolioAssetForm asset={Asset} onHide={hideModal} />
          </Modal.Body>
        </Modal>
      </>
  )
};

export default GroupedTables;