import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete} from 'react-icons/ai';
import { Row, Col, Button, 
  Modal 
} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { 
  fetchPortfolio, 
  removePortfolio, 
  removeRadar, 
  removeRadarItem, 
} from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import RadarItemForm from '../containers/RadarItemForm';
import RadarItem from '../components/RadarItem';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
`;

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [radarItemFormShow, setRadarItemFormShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = () => setRadarItemFormShow(true);
  const hideModal = () => setRadarItemFormShow(false);

  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push("/portfolios");

  const onFetchPortfolio = async () => {
    const json = await fetchPortfolio(params.id, auth.token);
    if (json) {
      setPortfolio(json);
    }
  };

  const onRemovePortfolio = () => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePortfolio(params.id, auth.token).then(onBack);
    }
  };

  const onRemoveRadar = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removeRadar(id, auth.token).then(onFetchPortfolio);
    }
  };

  const onRemoveRadarItem = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removeRadarItem(id, auth.token).then(onFetchPortfolio);
    }
  };

  useEffect(() => {
    onFetchPortfolio();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{portfolio.name}</h3>

              <Button variant="link" onClick={onRemovePortfolio}>
                <AiOutlineDelete size={25} color="red" />
              </Button>
            </div>
          </div>
        </Col> 

        <Col md={4}>
          <Panel>
            <RadarItemForm portfolio={portfolio} onDone={onFetchPortfolio} />
          </Panel>
        </Col>

        <Col md={8}>
          {portfolio?.radars?.map((radar) => (
            <div key={radar.id} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2">
                  <b>{radar.name}</b>
                </h4>
                <Button variant="link" onClick={() => onRemoveRadar(radar.id)}>
                  <AiOutlineDelete size={25} color="red" />
                </Button>
              </div>
              {radar.radar_items.map((item) => (
                <RadarItem 
                  key={item.id} 
                  item={item} 
                  onEdit={() => {
                    setSelectedItem(item);
                    showModal()
                  }}
                  onRemove={() => onRemoveRadarItem(item.id)}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>
    
      <Modal show={radarItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Radar Item</h4>
          <RadarItemForm 
            portfolio={portfolio}
            onDone={() => {
              onFetchPortfolio();
              hideModal()
            }}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>


    </MainLayout>
  )
};

export default Portfolio;