import { IoMdArrowBack } from 'react-icons/io';
import { Button, Card, Table } from 'react-bootstrap';
import React, { 
    // useEffect, 
    // useState, 
    // useContext
 } from 'react';


import { 
    useHistory 
} from 'react-router-dom';
import PieChart from './PieChart';


const SideModules = ({portfolio_categories=[]}) => {
    const history = useHistory();
    const onBack = () => history.push("/portfolios");

    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    <Button variant="link" onClick={onBack} className="float-left">
                    <IoMdArrowBack size={25} color="black" />
                    </Button>
                    <h3 className="mb-0 ml-2 mr-2 text-center">Meu Portfolio</h3>

                </Card.Header>
            </Card>
            <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">Resumo</Card.Header>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {portfolio_categories.map((category) => (
                            <tr key={category.name}>
                                <td>{category.name}</td>
                                <td><div className="float-right strong">{category.total_today_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div></td>
                            </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                        {portfolio_categories.map(a=>a.total_today_brl).reduce((a, e) => a + e, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                        
                            
                        
                    </Table>
                </Card.Body>
            </Card>
            <PieChart 
                portfolio_categories={portfolio_categories}
            />  
        </>
            
    )
};

export default SideModules;




