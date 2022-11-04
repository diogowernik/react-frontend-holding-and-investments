import { Button, Card, Table, Modal} from 'react-bootstrap';
import React, { useState,} from 'react';
import TransactionForm from '../../../containers/TransactionForm';

const SideModules = ({ group_total}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const group_total_order = group_total.sort((a, b) => b.total_today_usd - a.total_today_usd);
    const total = group_total_order.reduce((acc, curr) => acc + curr.total_today_usd, 0);
    const group_total_order_percentage = group_total_order.map((group) => {
        return {
            ...group,
            percentage: (group.total_today_usd / total) * 100,
        };
    });

    return (
        <>
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Patrimônio</h4>
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {group_total_order.map(group => (
                                <tr key={group.name}>
                                    <td>{group.name}</td>
                                    <td className='text-right mr-2'>
                                     U$ {group.total_today_usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
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
                                      U$ {group_total_order.map(a=>a.total_today_usd).reduce((a, e) => a + e, 0).toLocaleString('en-US', { maximumFractionDigits: 2 })} 
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
        </>
            
    )
};

export default SideModules;



