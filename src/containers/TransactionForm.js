import {Form, Button} from 'react-bootstrap';
import React, {useEffect, useState, useContext, useCallback} from 'react';
import { useParams} from 'react-router-dom';
import {fetchPortfolios, fetchAssets ,fetchBrokers, addTransaction} from '../apis';
import AuthContext from '../contexts/AuthContext';
import Select from 'react-select'

const TransactionForm = ({ onDone }) => {
    const [order, setOrder] = useState("");
    const [date, setDate] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [asset, setAsset] = useState("");
    const [broker, setBroker] = useState("");
    const [shares_amount, setSharesAmount] = useState("");
    const [share_cost_brl, setShareCostBrl] = useState("");
    const auth = useContext(AuthContext);
    const params = useParams();
   

    // portfolios, assets, brokers 
    const [portfolios, setPortfolios] = useState([]);
    const [assets, setAssets] = useState([]);
    const [brokers, setBrokers] = useState([]);
    
    // fetch assets, brokers

    //   Assets
    const onFetchAssets = useCallback(async () => {
        const json = await fetchAssets(auth.token);
        if (json) {
            setAssets(json);
        }
    }, [auth.token]);

    useEffect(() => {
        onFetchAssets();
    }, [onFetchAssets]);

    const assets_options = assets.map(asset => {
        return {
            value: asset.id,
            label: asset.ticker + " - " + asset.price.toFixed(2) + " BRL"
        }
    });

    // Brokers
    const onFetchBrokers = useCallback(async () => {
        const json = await fetchBrokers(auth.token);
        if (json) {
            setBrokers(json);
        }
    }, [auth.token]);
    
    useEffect(() => {
        onFetchBrokers();
    }, [onFetchBrokers]);

    const brokers_options = brokers.map(broker => {
        return {
            value: broker.id,
            label: broker.name
        }
    });
    
    // Add Transaction
     const onClick = async () => {
        const json = await addTransaction({
            order,
            date,
            portfolio: params.id,
            asset,
            broker,
            shares_amount,
            share_cost_brl,
        }, auth.token);
        if (json) {
            setOrder("");
            setDate("");
            setPortfolio("");
            setAsset("");
            setBroker("");
            setSharesAmount("");
            setShareCostBrl("");
            // onDone();
        }
    };

    // set defautValue for date
    const defaultDate = new Date().toISOString().split('T')[0];
    useEffect(() => {
        setDate(defaultDate);
    }, [defaultDate]);

    const defaultOrder = "Buy";
    useEffect(() => {
        setOrder(defaultOrder);
    }, [defaultOrder]);


return (
    <div>
        
        <h4 className='text-center'>Transaction</h4>
        <Form.Group>            
            <Form.Control 
                as="select" 
                defaultValue={defaultOrder}
                value={order} 
                onChange={e => setOrder(e.target.value)}
            >                
                <option value="">Tipo de Ordem</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Control 
                type="date" 
                // value={date} 
                defaultValue={defaultDate}
                onChange={e => setDate(e.target.value)} 
            />
        </Form.Group>
        <Form.Group>
            <Select
                onChange={(e) => setAsset(e.value)}
                placeholder="Select Asset"
                options={assets_options}
            />
        </Form.Group>
        <Form.Group>
            <Select
                onChange={(e) => setBroker(e.value)}
                placeholder="Select Broker"
                options={brokers_options}
            />
        </Form.Group>
        <Form.Group>
            {/* float number */}
            <Form.Control type="number" placeholder='Shares Amount' value={shares_amount} onChange={e => setSharesAmount(e.target.value)} />
        </Form.Group>
        <Form.Group>
            {/* float number */}
            <Form.Control type="number" placeholder='Share Cost Brl' value={share_cost_brl} onChange={e => setShareCostBrl(e.target.value)} />
        </Form.Group>
        
        <Button variant="primary" block onClick={onClick}>
            Submit
        </Button>
        
    </div>
    );
};

export default TransactionForm;
