import { Button, Card, Table, Modal, Tab, Nav } from 'react-bootstrap';
import React, { useState,} from 'react';
import TransactionForm from '../../containers/TransactionForm';
import { AiFillEyeInvisible } from 'react-icons/ai';

const SideModules = ({ group_total, group_total_usd }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log (group_total_usd)

    // order group_total by total by total_today_brl descending
    const group_total_order = group_total.sort((a, b) => b.total_today_brl - a.total_today_brl);
    const group_total_usd_order = group_total_usd.sort((a, b) => b.total_today_usd - a.total_today_usd);
    // calculate total of all groups
    const total = group_total_order.reduce((acc, curr) => acc + curr.total_today_brl, 0);
    const total_usd = group_total_usd_order.reduce((acc, curr) => acc + curr.total_today_usd, 0);
    // calculate percentage of each group
    const group_total_order_percentage = group_total_order.map((group) => {
        return {
            ...group,
            percentage: (group.total_today_brl / total) * 100,
        };
    });
    const group_total_usd_order_percentage = group_total_usd_order.map((group) => {
        return {
            ...group,
            percentage: (group.total_today_usd / total_usd) * 100,
        };
    });

    return (
        <>
          <Tab.Container defaultActiveKey="hide">
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Patrimônio</h4>
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
                    <Table responsive>
                        <tbody>
                            {group_total_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right mr-2'>
                                      {group.total_today_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                      {/* percentage */}
                                      <span className="text-muted ml-2">
                                        
                                        ( {group_total_order_percentage.find((g) => g.name === group.name).percentage.toFixed(2)} % )
                                      </span>
                                      {/* if group total usd to locale */}
                                      {group.total_today_usd && (
                                        <span className="text-muted ml-2">
                                          {group.total_today_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </span>
                                      )}
                                    
                                    </td>
                                </tr>
                            
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                        {group_total_order.map(a=>a.total_today_brl).reduce((a, e) => a + e, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                    </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="USD">
                  <Table responsive>
                        <tbody>
                            {group_total_usd_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right mr-2'>
                                      $ {group.total_today_usd.toLocaleString('pt-BR')}
                                      <span className="text-muted ml-2">
                                        ( {group_total_usd_order_percentage.find((g) => g.name === group.name).percentage.toFixed(2)} % )
                                      </span>                                    
                                    </td>
                                </tr>
                            
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                      $ {group_total_usd_order.map(a=>a.total_today_usd).reduce((a, e) => a + e, 0).toLocaleString('pt-BR') }
                                    </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="hide">
                  <Table responsive>
                        <tbody>
                            {group_total_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right mr-2'>
                                      ****
                                      {/* percentage */}
                                      <span className="text-muted ml-2">
                                        
                                        ( {group_total_order_percentage.find((g) => g.name === group.name).percentage.toFixed(2)} % )
                                      </span>
                                    </td>
                                </tr>
                            
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                        **** 
                                    </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
                </Card.Body>
                <Card.Footer>
                <Button className='float-right' variant="primary" onClick={handleShow}>
                    Adicionar Transação
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Transação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransactionForm />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
                </Card.Footer>
            </Card>

          </Tab.Container>
            
        </>
            
    )
};

export default SideModules;




