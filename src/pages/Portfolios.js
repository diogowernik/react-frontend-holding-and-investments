import { Row, Col, Modal, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { fetchPortfolios, removePortfolio, updatePortfolio} from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import PortfolioForm from '../containers/PortfolioForm';
import ImageDropzone from '../containers/ImageDropzone';

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

  const [editingImagePortfolioId, setEditingImagePortfolioId] = useState(null);
  const [newImage, setNewImage] = useState(null);


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

  const onEditImage = (portfolio) => {
    setEditingImagePortfolioId(portfolio.id);
    setNewImage(portfolio.image); // Ou null, dependendo de como você quer lidar com isso
  };
  
  const onSaveImage = async (id) => {
    try {
      // Aqui, você precisa converter newImage para o formato que sua API espera
      const updatedData = { image: newImage };
      await updatePortfolio(id, updatedData, auth.token);
      setEditingImagePortfolioId(null);
      onFetchPortfolios();
    } catch (error) {
      console.error("Erro ao atualizar a imagem do portfolio:", error);
    }
  };
  
  const onCancelImageEdit = () => {
    setEditingImagePortfolioId(null);
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
      ) : editingImagePortfolioId === portfolio.id ? (
        <div>
          <p>Clique ou arraste uma imagem para trocar</p>
          <ImageDropzone value={newImage} onChange={setNewImage} />
          <Button variant="link" onClick={() => onSaveImage(portfolio.id)}>Salvar</Button>
          <Button variant="link" onClick={onCancelImageEdit}>Cancelar</Button>
        </div>
      ) : (
        <Portfolio onClick={() => history.push(`/portfolio/${portfolio.id}/brl`)}>
          <div style={{ backgroundImage: `url(${portfolio.image})` }}>
            <Button variant="link" onClick={(e) => {
              e.stopPropagation();
              onEditImage(portfolio);
            }}>
              <AiOutlineEdit size={25} color="blue" />
            </Button>
          </div>
          <p>{portfolio.name} | 
            <Button variant="link" onClick={(e) => {
              e.stopPropagation();
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
