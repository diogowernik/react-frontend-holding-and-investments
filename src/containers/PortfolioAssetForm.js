import React, { useState, useContext} from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { updatePortfolioAsset } from '../apis';
import AuthContext from '../contexts/AuthContext';

const PortfolioAssetForm = ({ asset = {} }) => {
  const [ticker , setTicker] = useState(asset.ticker || '');
  const [id, setId] = useState(asset.id || null);
  const [shares_amount, setSharesAmount] = useState(asset.shares_amount || 0);
  const [share_average_price_brl, setShareAveragePriceBrl] = useState(asset.share_average_price_brl || 0);
  const [share_average_price_usd, setShareAveragePriceUsd] = useState(asset.share_average_price_usd || 0);
  const auth = useContext(AuthContext);

  const onUpdatePortfolioAsset = async () => {
    const json = await updatePortfolioAsset(
      id,
    {
      shares_amount,
      share_average_price_brl,
      share_average_price_usd
    }, 
    auth.token);

    

    if (json) {
      toast(`O Ativo ${ticker} foi atualizado`, { type: "success" });
      setSharesAmount(0);
      setShareAveragePriceBrl(0);
      setShareAveragePriceUsd(0);
      setId(null);
      setTicker('');
      console.log("updated, need to refresh, but not implemented yet")
      // solução tabajara
      window.location.reload();
    }
  }
  return (
    <div className="d-flex flex-column">
      <Form.Group>
        <Form.Label>Quantidade de Ações</Form.Label>
        <Form.Control
          type="number"
          value={shares_amount}
          onChange={e => setSharesAmount(e.target.value)}
        />
        <Form.Label>Preço Médio de Compra</Form.Label>
        <Form.Control
          type="number"
          value={share_average_price_brl}
          onChange={e => setShareAveragePriceBrl(e.target.value)}
        />
        <Form.Label>Preço Médio de Compra em USD</Form.Label>
        <Form.Control
          type="number"
          value={share_average_price_usd}
          onChange={e => setShareAveragePriceUsd(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={onUpdatePortfolioAsset}
      >
        {asset.ticker ? "Atualizar" : "Adicionar"}
      </Button>
      
    </div>
  );
};

export default PortfolioAssetForm;