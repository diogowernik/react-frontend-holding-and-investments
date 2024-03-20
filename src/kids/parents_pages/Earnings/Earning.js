import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AuthContext from '../../../contexts/AuthContext';
import KidsNav from '../../components/KidsNav/KidsNav';
import { fetchKidsEarns, addKidsEarn, updateKidsEarn, deleteKidsEarn } from '../../../apis';
import Select from 'react-select';

import '../../ParentDashboard.css';
import './Earning.css'; // Make sure to create this CSS file for styling

const Earning = () => {
  const { slug } = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [earnings, setEarnings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEarn, setSelectedEarn] = useState(null);
  
  // States for form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchEarnings = useCallback(async () => {
    try {
      const json = await fetchKidsEarns(slug, auth.token);
      if (json) {
        // Ordenar as receitas pela data, do mais novo para o mais antigo
        const sortedEarnings = json.sort((a, b) => {
          // Convertendo DD/MM/YYYY para YYYY-MM-DD para comparação
          const dateA = a.date.split("/").reverse().join("-");
          const dateB = b.date.split("/").reverse().join("-");
          return dateB.localeCompare(dateA);
        });
        setEarnings(sortedEarnings);
      }
    } catch (error) {
      console.error('Error fetching earnings:', error);
    }
  }, [slug, auth.token]);
  

  useEffect(() => {
    if (slug && auth.token) {
      fetchEarnings();
    }
  }, [slug, auth.token, fetchEarnings]);

  const handleAddClick = () => {
    // Aqui, redefina todos os campos para seus valores padrão quando adicionar uma nova receita
    setSelectedEarn(null);
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]); // Define a data para hoje ao adicionar nova receita
    setShowModal(true);
  };

  // set defautValue for date eu gostaria que fosse possível escolher e se for editar que mantivesse a data já existente.
  const defaultDate = new Date().toISOString().split('T')[0];
      useEffect(() => {
          setDate(defaultDate);
      }, [defaultDate]);

  const handleSaveEarn = async () => {
    const earnData = {
      date, 
      description,
      amount,
      category,
    };
  
    if (selectedEarn) {
      await updateKidsEarn(slug, selectedEarn.id, earnData, auth.token);
    } else {
      await addKidsEarn(slug, earnData, auth.token);
    }
    fetchEarnings();
    setShowModal(false);
  };

  const handleEditClick = (earn) => {
    setSelectedEarn(earn);
    setDescription(earn.description);
    setAmount(earn.amount);
    setCategory(earn.category);
    // Converter a data de DD/MM/YYYY para YYYY-MM-DD
    const parts = earn.date.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    
    setDate(formattedDate);
    setShowModal(true);
  };

  const handleDeleteClick = async (earnId) => {
    const isConfirmed = window.confirm("Deseja deletar esta receita?");
    if (isConfirmed) {
      await deleteKidsEarn(slug, earnId, auth.token);
      fetchEarnings();
    }
  };
  

  const categoryOptions = [
    { value: 'aluguel', label: 'Aluguel' },
    { value: 'missao', label: 'Missão' },
    { value: 'presente', label: 'Presente' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <>
      <KidsNav />
      <Container className="earning-container mt-4">
        <Row className="justify-content-md-center">
          <Col xs={6} className='text-center'>
            <Button variant="success" className="m-4" onClick={handleAddClick}>
              Adicionar Receita
            </Button>
          </Col>
          <Col xs={6} className='text-center'>
            <Button variant="secondary" className="m-4" onClick={() => history.push(`/kids/${slug}/config`)}>
              Voltar para Configurações
            </Button>
          </Col>
          <Col xs={12}>
            <Row>
              {earnings.map((earn) => (
                <ListGroup.Item key={earn.id} className="earn-item">
                  <span className='float-right'>
                    <FaEdit size={20} className="action-icon mr-4" onClick={() => handleEditClick(earn)} />
                    <FaTrash size={20} className="action-icon" onClick={() => handleDeleteClick(earn.id)} />
                  </span>
                  <span className='mr-4'>{earn.date}</span>
                  <span className='mr-4'>R$ {earn.amount}</span>
                  <span className='float-left'>{earn.description}</span>
                  

                </ListGroup.Item>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEarn ? 'Edit Earn' : 'Add Earn'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
  <Form.Group>
      <Form.Control 
          type="date" 
          value={date} // Use o estado da data aqui
          onChange={e => setDate(e.target.value)} 
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Amount</Form.Label>
      <Form.Control
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3">
    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Select
        options={categoryOptions}
        value={categoryOptions.find(option => option.value === category)}
        onChange={(selectedOption) => setCategory(selectedOption.value)}
      />

    </Form.Group>
</Form.Group>

  </Form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEarn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Earning;
