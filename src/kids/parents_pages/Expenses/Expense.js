import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AuthContext from '../../../contexts/AuthContext';
import KidsNav from '../../components/KidsNav/KidsNav';
import { fetchKidsExpenses, addKidsExpense, updateKidsExpense, deleteKidsExpense } from '../../../apis'; // Ajuste os imports conforme necessário
import Select from 'react-select';

import '../../ParentDashboard.css';
import './Expense.css'; // Crie um CSS específico para esta página, se necessário

const Expense = () => {
  const { slug } = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  // States for form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchExpenses = useCallback(async () => {
    try {
      const json = await fetchKidsExpenses(slug, auth.token); // Ajuste conforme sua API
      if (json) {
        // Ordenar as despesas pela data, do mais novo para o mais antigo
        const sortedExpenses = json.sort((a, b) => {
          // Convertendo DD/MM/YYYY para YYYY-MM-DD para comparação
          const dateA = a.date.split("/").reverse().join("-");
          const dateB = b.date.split("/").reverse().join("-");
          return dateB.localeCompare(dateA);
        });
        setExpenses(sortedExpenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [slug, auth.token]);

  useEffect(() => {
    if (slug && auth.token) {
      fetchExpenses();
    }
  }, [slug, auth.token, fetchExpenses]);

  const handleAddClick = () => {
    // Redefinir os campos para os valores padrão ao adicionar uma nova despesa
    setSelectedExpense(null);
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setShowModal(true);
  };

  const handleSaveExpense = async () => {
    const expenseData = {
      date, 
      description,
      amount,
      category,
    };
  
    if (selectedExpense) {
      await updateKidsExpense(slug, selectedExpense.id, expenseData, auth.token); // Ajuste conforme sua API
    } else {
      await addKidsExpense(slug, expenseData, auth.token); // Ajuste conforme sua API
    }
    fetchExpenses();
    setShowModal(false);
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
    const parts = expense.date.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setDate(formattedDate);
    setShowModal(true);
  };

  const handleDeleteClick = async (expenseId) => {
    const isConfirmed = window.confirm("Deseja deletar esta despesa?");
    if (isConfirmed) {
      await deleteKidsExpense(slug, expenseId, auth.token); // Ajuste conforme sua API
      fetchExpenses();
    }
  };

  const categoryOptions = [
    { value: 'doces', label: 'Doces' },
    { value: 'comidas', label: 'Comidas' },
    { value: 'brinquedos', label: 'Brinquedos' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <>
      <KidsNav />
      <Container className="expense-container mt-4">
        <Row className="justify-content-md-center">
          <Col xs={6} className='text-center'>
            <Button variant="success" className="m-4" onClick={handleAddClick}>
              Adicionar Despesa
            </Button>
          </Col>
          <Col xs={6} className='text-center'>
            <Button variant="secondary" className="m-4" onClick={() => history.push(`/kids/${slug}/config`)}>
              Voltar para Configurações
            </Button>
          </Col>
          <Col xs={12}>
            <Row>
              {expenses.map((expense) => (
                <ListGroup.Item key={expense.id} className="expense-item">
                  <span className='float-right'>
                    <FaEdit size={20} className="action-icon mr-4" onClick={() => handleEditClick(expense)} />
                    <FaTrash size={20} className="action-icon" onClick={() => handleDeleteClick(expense.id)} />
                  </span>
                  <span className='mr-4'>{expense.date}</span>
                  <span className='mr-4'>R$ {expense.amount}</span>
                  <span className='float-left'>{expense.description}</span>
                  

                </ListGroup.Item>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedExpense ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveExpense}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Expense;
