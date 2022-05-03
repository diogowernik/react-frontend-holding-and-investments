import { IoMdArrowBack } from 'react-icons/io';
import { Button, Card, Table, Modal } from 'react-bootstrap';
import React, { useState,} from 'react';

import { useHistory } from 'react-router-dom';
import PieChart from './PieChart';
import TransactionForm from '../../containers/TransactionForm';


const SideModules = ({categories_total=[]}) => {
    const history = useHistory();
    const onBack = () => history.push("/portfolios");
    
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    <Button variant="link" onClick={onBack} className="float-left">
                    <IoMdArrowBack size={25} color="black" />
                    </Button>
                    <h4 className="mb-0 ml-2 mr-2 text-center">Meu Portfolio</h4>

                </Card.Header>
            </Card>
            <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">Resumo</Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {categories_total.map(category => (
                                <tr key={category.name}>
                                    <td>{category.name}</td>
                                    <td className='text-right'>{category.total_today_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                        {categories_total.map(a=>a.total_today_brl).reduce((a, e) => a + e, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                        
                            
                        
                    </Table>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" onClick={handleShow}>
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
                        <Button variant="primary" onClick={handleClose}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                </Card.Footer>
            </Card>
            <PieChart 
                categories_total={categories_total}
            />  
            {/* <Tokenize 
                
                />   */}
        </>
            
    )
};

export default SideModules;




