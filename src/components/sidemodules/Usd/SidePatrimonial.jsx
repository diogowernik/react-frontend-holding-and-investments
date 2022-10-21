import { Button, Card, Table, Modal, Tab, Nav } from 'react-bootstrap';
import React, { useState,} from 'react';
import TransactionForm from '../../../containers/TransactionForm';

const SideModules = ({ group_total_usd }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const group_total_usd_order = group_total_usd.sort((a, b) => b.total_today_usd - a.total_today_usd);
    const total_usd = group_total_usd_order.reduce((acc, curr) => acc + curr.total_today_usd, 0);
    const group_total_usd_order_percentage = group_total_usd_order.map((group) => {
        return {
            ...group,
            percentage: (group.total_today_usd / total_usd) * 100,
        };
    });

    return (
        <>
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Patrimony</h4>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                        <tbody>
                            {group_total_usd_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right mr-2'>
                                      U$ {group.total_today_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      <span className="text-muted ml-2">
                                        ( {group_total_usd_order_percentage.find((g) => g.name === group.name).percentage.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% )
                                      </span>                                    
                                    </td>
                                </tr>
                            
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                      U$ {group_total_usd_order.map(a=>a.total_today_usd).reduce((a, e) => a + e, 0).toLocaleString('en-US')}
                                    </div>
                                </th>
                            </tr>
                        </tbody>                  
                  </Table>
                </Card.Body>
                <Card.Footer>
                <Button className='float-right' variant="primary" onClick={handleShow}>
                    Adicionar Transação
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Transaction</Modal.Title>
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

            
        </>
            
    )
};

export default SideModules;




