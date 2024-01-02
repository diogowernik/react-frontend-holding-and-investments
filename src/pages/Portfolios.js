import { Row, Col, Modal, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { fetchPortfolios, removePortfolio, updatePortfolio} from '../apis';
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
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [editedName, setEditedName] = useState('');

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

  const onEdit = (portfolio) => {
    setEditingPortfolioId(portfolio.id);
    setEditedName(portfolio.name);
  };

  const onSave = async (id) => {
    try {
      const updatedData = { name: editedName };
      await updatePortfolio(id, updatedData, auth.token);  // Use a função updatePortfolio
      setEditingPortfolioId(null);
      onFetchPortfolios();  // Recarrega os portfolios atualizados
    } catch (error) {
      console.error("Erro ao atualizar o portfolio:", error);
      // Adicione aqui qualquer tratamento de erro ou notificação ao usuário
    }
  };

  const onCancel = () => {
    setEditingPortfolioId(null);
  };


  useEffect(() => {
    onFetchPortfolios();
  }, [onFetchPortfolios]);

  return (
    <MainLayout>
      <Container>
      <h3>Meus Portfolios</h3>

      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          {/* Passa o portfolio para o formulário se estiver no modo de edição */}
          <PortfolioForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {portfolios.map((portfolio) => (
          <Col key={portfolio.id} lg={4}>
            {/* Se o portfolio está sendo editado, mostra o campo de entrada e botões de salvar/cancelar */}
            {editingPortfolioId === portfolio.id ? (
              <div>
                <input 
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <Button variant="link" onClick={() => onSave(portfolio.id)}>Salvar</Button>
                <Button variant="link" onClick={onCancel}>Cancelar</Button>
              </div>
            ) : (
              /* Se não está em edição, mostra o nome e os botões normalmente */
              <Portfolio onClick={() => history.push(`/portfolio/${portfolio.id}/brl`)}>
                <div style={{ backgroundImage: `url(${portfolio.image})` }}></div>
                <p>{portfolio.name} | 
                  <Button variant="link" onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique se propague para o Portfolio
                    onEdit(portfolio);
                  }}>
                    <AiOutlineEdit size={25} color="blue" />
                  </Button>
                  <Button variant="link" onClick={() => onRemovePortfolio(portfolio.id)}>
                    <AiOutlineDelete size={25} color="red" />
                  </Button>
                </p>
              </Portfolio>
            )}
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
