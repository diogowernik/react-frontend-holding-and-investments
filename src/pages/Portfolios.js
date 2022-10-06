import { Row, Col, Modal, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { 
  AiOutlineDelete, 
  // AiFillEdit 
} from 'react-icons/ai';

import { 
  fetchPortfolios, 
  removePortfolio,
  // updatePortfolio 
} from '../apis';
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
  const history = useHistory();

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);
  const onFetchPortfolios = useCallback(async () => {
    const json = await fetchPortfolios(auth.token);
    if (json) {
      setPortfolios(json);
    }
  }, [auth.token]);


  const onDone = () => {
    onFetchPortfolios();
    onHide();
  };

  const onRemovePortfolio = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePortfolio(id, auth.token).then(onFetchPortfolios);
    }
  }

  useEffect(() => {
    onFetchPortfolios();
  }, [onFetchPortfolios]);

  return (
    <MainLayout>
      <Container>
      <h3>Meus Portfolios</h3>

      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PortfolioForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {portfolios.map((portfolio) => (
          <Col key={portfolio.id} lg={4}>
            <Portfolio onClick={() => history.push(`/portfolios/${portfolio.id}`)}>
              <div style={{ backgroundImage: `url(${portfolio.image})` }}></div>
              <p>{portfolio.name} | 
              <Button variant="link" onClick={() => onRemovePortfolio(portfolio.id)}>
                  <AiOutlineDelete size={25} color="red" />
              </Button>
              
              </p>
            </Portfolio>
            <Button variant="link" onClick={() => history.push(`/dividends/${portfolio.id}`)}>
                  Dividends
              </Button>
          </Col>
        ))}
        <Col lg={4}>
          <AddPortfolioButton onClick={onShow}>Criar novo Portfolio</AddPortfolioButton>
        </Col>
      </Row>
      </Container>
    </MainLayout>
  );
};

export default Portfolios;
