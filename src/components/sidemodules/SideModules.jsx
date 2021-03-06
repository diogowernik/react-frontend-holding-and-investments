import { Button, Card, Table, Modal } from 'react-bootstrap';
import React, { useState,} from 'react';
import PieChart from './PieChart';
import TransactionForm from '../../containers/TransactionForm';

const SideModules = ({ group_total}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // order group_total by total by total_today_brl descending
    const group_total_order = group_total.sort((a, b) => b.total_today_brl - a.total_today_brl);
    
    return (
        <>
            <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">Resumo</Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {group_total_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right'>{group.total_today_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
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
            <PieChart 
                total={group_total}
            />  
        </>
            
    )
};

export default SideModules;




