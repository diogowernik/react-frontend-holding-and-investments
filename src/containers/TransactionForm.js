import {Form, Button} from 'react-bootstrap';
import React, {useEffect, useState, useContext, useCallback} from 'react';
import { useParams} from 'react-router-dom';
import {fetchPortfolios, fetchAssets ,fetchBrokers, addTransaction} from '../apis';
import AuthContext from '../contexts/AuthContext';

const TransactionForm = ({onDone}) => {
    const [order, setOrder] = useState("");
    const [date, setDate] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [asset, setAsset] = useState("");
    const [broker, setBroker] = useState("");
    const [shares_amount, setSharesAmount] = useState("");
    const [shares_cost_brl, setSharesCostBrl] = useState("");

    const auth = useContext(AuthContext);
    const params = useParams();

   

    // portfolios, assets, brokers 
    const [portfolios, setPortfolios] = useState([]);
    const [assets, setAssets] = useState([]);
    const [brokers, setBrokers] = useState([]);
    
    const onFetchPortfolios = useCallback(async () => {
        const json = await fetchPortfolios(auth.token);
        if (json) {
          setPortfolios(json);
        }
      }, [auth.token]);
    
      useEffect(() => {
        onFetchPortfolios();
      }, [onFetchPortfolios]);
    
    const onFetchAssets = useCallback(async () => {
        const json = await fetchAssets(auth.token);
        if (json) {
            setAssets(json);
        }
    }, [auth.token]);

    useEffect(() => {
        onFetchAssets();
    }, [onFetchAssets]);

    const onFetchBrokers = useCallback(async () => {
        const json = await fetchBrokers(auth.token);
        if (json) {
            setBrokers(json);
        }
    }, [auth.token]);
    
    useEffect(() => {
        onFetchBrokers();
    }, [onFetchBrokers]);
    
     const onClick = async () => {
        const json = await addTransaction(params.id, {
            order,
            date,
            portfolio,
            asset,
            broker,
            shares_amount,
            shares_cost_brl,
        }, auth.token);
        if (json) {
            setOrder("");
            setDate("");
            setPortfolio("");
            setAsset("");
            setBroker("");
            setSharesAmount("");
            setSharesCostBrl("");
            onDone();
        }
    };

return (
    <div>
        {/* <p>{portfolio.id}</p> */}
        <h4 className='text-center'>Transaction</h4>
        <Form.Group>
            {/* select */}
            <Form.Control as="select" value={order} onChange={e => setOrder(e.target.value)}>
                <option value="">Select</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Control type="text" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
        </Form.Group>
        <Form.Group>
            {/* select */}
            <Form.Control
                as='select'
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
            >  
                <option value="">Select Portfolio</option>
                {/* fetch portfolios options */}
                {portfolios.map(portfolio => (
                    <option key={portfolio.id} value={portfolio.id}>{portfolio.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group>
            {/* select */}
            <Form.Control
                as='select'
                value={asset}   
                onChange={(e) => setAsset(e.target.value)}
            >
                <option value="">Select Asset</option>
                {/* fetch assets options */}
                {assets.map(asset => (
                    <option key={asset.id} value={asset.id}>{asset.ticker}</option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group>
            {/* select */}
            <Form.Control
                as='select'
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
            >
                <option value="">Select Broker</option>
                {/* fetch brokers options */}
                {brokers.map(broker => (
                    <option key={broker.id} value={broker.id}>{broker.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group>
            {/* float number */}
            <Form.Control type="number" placeholder='Shares Amount' value={shares_amount} onChange={e => setSharesAmount(e.target.value)} />
        </Form.Group>
        <Form.Group>
            {/* float number */}
            <Form.Control type="number" placeholder='Share Cost Brl' value={shares_cost_brl} onChange={e => setSharesCostBrl(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={onClick}>
            Submit
        </Button>
        
    </div>
    );
};

export default TransactionForm;
