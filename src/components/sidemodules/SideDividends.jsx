import { Card, Table, Tab, Nav } from 'react-bootstrap';
import React from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';

const SideDividends = ({ total_dividends_brl, total_dividends_usd }) => {

    // console.log(total_dividends_brl);
    // console.log(total_dividends_usd);
    
    

    return (
        <>
          <Tab.Container defaultActiveKey="hide">
          <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">
                  <h4 className="float-left mt-2">Dividendos</h4>
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
                            {/* map total_dividends_brl */}
                            {total_dividends_brl.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td>
                                      <span className="float-right">
                                        R$ {dividend.total_dividend_brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                      </span>
                                    </td>
                                </tr>
                            ))}

                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                     {total_dividends_brl.reduce((acc, dividend) => acc + dividend.total_dividend_brl, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="USD">
                  <Table responsive>
                        <tbody>
                            {/* map total_dividends_usd */} 
                            {total_dividends_usd.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td>
                                      <span className="float-right">
                                         {dividend.total_dividend_usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right">
                                  <div className="mt-2 strong">
                                    {total_dividends_usd.reduce((acc, dividend) => acc + dividend.total_dividend_usd, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                                  </div>
                                </th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="hide">
                  <Table responsive>
                        <tbody>
                            {/* map invisble  */}
                            {total_dividends_brl.map((dividend) => (
                                <tr key={dividend.name}>
                                    <td>{dividend.name}</td>
                                    <td>
                                      <span className="float-right">
                                        ***
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            
              
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th className="text-right"><div className="mt-2 strong">
                                  ***
                                  </div></th>
                            </tr>
                        </tbody>                  
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
                </Card.Body>
                <Card.Footer>
                
                </Card.Footer>
            </Card>

          </Tab.Container>
            
        </>
            
    )
};

export default SideDividends;




