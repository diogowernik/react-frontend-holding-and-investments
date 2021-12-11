import { Row, Col, Modal } from 'react-bootstrap';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';

import { fetchPortfolios } from '../apis';
import AuthContext from '../contexts/AuthContext';

import MainLayout from '../layouts/MainLayout';
import PortfolioForm from '../containers/PortfolioForm';

const Portfolio = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
  > div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
  }
  > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;
const AddPortfolioButton = styled.div`
  border: 1px dashed gray;
  height: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #fbfbfb;
  }
`;

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [show, setShow] = useState(false);

  const auth = useContext(AuthContext);

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);
  const onFetchPortfolios = useCallback(async () => {
    const json = await fetchPortfolios(auth.token);
    if (json) {
      setPortfolios(json);
    }
  }, [auth.token]);

  useEffect(() => {
    onFetchPortfolios();
  }, [onFetchPortfolios]);

  const onDone = () => {
    onFetchPortfolios();
    onHide();
  };

  return (
    <MainLayout>
      <h3>My Portfolios</h3>

      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PortfolioForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {portfolios.map((portfolio) => (
          <Col key={portfolio.id} lg={4}>
            <Portfolio>
              <div style={{ backgroundImage: `url(${portfolio.image})` }}></div>
              <p>{portfolio.name}</p>
            </Portfolio>
          </Col>
        ))}
        <Col lg={4}>
          <AddPortfolioButton onClick={onShow}>Add New Portfolio</AddPortfolioButton>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Portfolios;
