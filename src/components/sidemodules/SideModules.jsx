import { IoMdArrowBack } from 'react-icons/io';
import { Button, Card, Table } from 'react-bootstrap';
import React, { 
    // useEffect, 
    // useState, 
    // useContext
 } from 'react';
// import {fetchPortfolio} from '../../apis';
// import AuthContext from '../../contexts/AuthContext';

import { 
    // useParams, 
    useHistory 
} from 'react-router-dom';


const SideModules = ({portfolio_total=[]}) => {
    // const auth = useContext(AuthContext);
    // const params = useParams();
    // const [portfolio, setPortfolio] = useState({});
    const history = useHistory();
    const onBack = () => history.push("/portfolios");

    // const onFetchPortfolio = async () => {
    //     const json = await fetchPortfolio(params.id, auth.token);
    //     if (json) {
    //       setPortfolio(json);
    //     }
    //   };
    // useEffect(() => {
    //     onFetchPortfolio();
    // }, [onFetchPortfolio]);

    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    <Button variant="link" onClick={onBack} className="float-left">
                    <IoMdArrowBack size={25} color="black" />
                    </Button>
                    {/* <h3 className="mb-0 ml-2 mr-2 text-center">{portfolio.name}</h3> */}

                    {/* <Button variant="link" onClick={onRemovePortfolio}>
                    <AiOutlineDelete size={25} color="red" />
                    </Button> */}
                </Card.Header>
            </Card>
            <Card  color="gray" className="mb-3">
                <Card.Header className="bg-gray-lighter">Resumo</Card.Header>
                <Card.Body>
                    <Table responsive>
                        {console.log(portfolio_total)}
                        <tbody>
                            {portfolio_total.map((category) => (
                            <tr key={category.name}>
                                <td>{category.name}</td>
                                <td><div className="float-right strong">{category.total_today_brl}</div></td>
                            </tr>
                            ))}
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Total</div></th>
                                <th>
                                    <div className="float-right h5 text-primary">
                                        reduce total_today_brl
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                        
                            
                        
                    </Table>
                </Card.Body>
            </Card>
        </>
            
    )
};

export default SideModules;




