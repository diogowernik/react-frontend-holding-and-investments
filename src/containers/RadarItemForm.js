import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { addRadar, addRadarItems, updateRadarItem } from '../apis';
import AuthContext from '../contexts/AuthContext';

const RadarItemForm = ({ portfolio, onDone, item = {} }) => {
  const [radarName, setRadarName] = useState("");
  const [radarFormShow, setRadarFormShow] = useState(false);
  
  const [radar, setRadar] = useState(item.radar);
  const [asset, setAsset] = useState(item.asset);

  const target = useRef(null);

  const auth = useContext(AuthContext);

  const onAddRadar = async () => {
    const json = await addRadar({ name: radarName, portfolio: portfolio.id }, auth.token);
    console.log(json);

    if (json) {
      toast(`Radar ${json.name} was created.`, { type: "success"});
      setRadar(json.id);
      setRadarName("");
      setRadarFormShow(false);
      onDone();
    }
  };

  const onAddRadarItems = async () => {
    const json = await addRadarItems({
      portfolio: portfolio.id,
      radar,
      asset: asset
    }, auth.token);

    console.log(json);

    if (json) {
      toast(`Radar Item ${json.asset.ticker} was created`, { type: "success" });
      setRadar("");
      setAsset("");
      onDone();
    }
  }

  const onUpdateRadarItem = async () => {
    const json = await updateRadarItem(
      item.id,
      {
        portfolio: portfolio.id,
        radar,
        asset
      },
      auth.token
    );

    if (json) {
      console.log(json);

      toast(`Radar Item ${json.asset.ticker} was updated`, { type: "success" });
      setRadar("");
      setAsset("");
      onDone();
    }
  }

  return (
    <div>
      {/* RADAR FORM */}
      <Form.Group>
        <Form.Label>Radar</Form.Label>
        <div className="d-flex align-items-center">

          <Form.Control as="select" value={radar} onChange={(e) => setRadar(e.target.value)}>
            <option />
            {portfolio?.radars?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.asset}
              </option>
            ))}
          </Form.Control>

          <Button ref={target} variant="link" onClick={() => setRadarFormShow(true)}>
            <RiPlayListAddFill size={25} />
          </Button>

          <Overlay 
            show={radarFormShow} 
            target={target.current} 
            placement="bottom" 
            rootClose 
            onHide={() => setRadarFormShow(false)}
          >
            <Popover id="popover-contained">
              <Popover.Title as="h3">Radar</Popover.Title>
              <Popover.Content>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Radar Asset"
                    value={radarName}
                    onChange={(e) => setRadarName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="standard" block onClick={onAddRadar}>
                  Add Radar
                </Button>
              </Popover.Content>
            </Popover>
            
          </Overlay>


        </div>
      </Form.Group>
    
      {/* RADAR ITEMS FORM */}
      <Form.Group>
        <Form.Label>Asset</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Asset"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
        />
      </Form.Group>
      <Button 
        variant="standard" 
        block 
        onClick={ item.id ? onUpdateRadarItem : onAddRadarItems}
      >
        { item.id ? "Update Radar Item" : "+ Add Radar Item" }
      </Button>
    </div>

  );
}

export default RadarItemForm;