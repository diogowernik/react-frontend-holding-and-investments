import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { fetchKidsProfile, updateKidProfile } from '../../../apis'; // Ajuste conforme necessário
import KidsNav from '../../components/KidsNav/KidsNav';
// import ImageDropzone from '../../../containers/ImageDropzone/ImageDropzone';


import '../../ParentDashboard.css';
import '../../css/GlobalKids.css';
import './KidProfile.css';

const KidProfile = () => {
  const { slug } = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [kidProfile, setKidProfile] = useState(null);
  const [name, setName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [age, setAge] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

//   const [image, setImage] = useState('');

const onSubmit = async (e) => {
  e.preventDefault();

  const updatedProfile = {
    name,
    current_balance: currentBalance,
    age,
    // image,
  };

  const json = await updateKidProfile(slug, updatedProfile, auth.token);
  if (json) {
    setFeedback({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    setTimeout(() => {
      // Recarrega a página após um curto atraso para permitir que o usuário veja a mensagem de feedback
      history.go(0);
    }, 3000); // Ajuste o tempo conforme necessário
  } else {
    setFeedback({ message: 'Falha ao atualizar o perfil.', type: 'danger' });
    setTimeout(() => setFeedback({ message: '', type: '' }), 2000); // Limpa a mensagem após 3 segundos mesmo em caso de falha
  }
};


// Função fetchProfile movida para fora do useEffect para poder ser reutilizada
const fetchProfile = useCallback(async () => {
  const profileData = await fetchKidsProfile(slug, auth.token);
  if (profileData) {
    setKidProfile(profileData);
    setName(profileData.name);
    setCurrentBalance(profileData.current_balance);
    setAge(profileData.age);
    // setImage(profileData.image);
  }
}, [slug, auth.token]); // fetchProfile agora é memorizado e só muda se slug ou auth.token mudarem

useEffect(() => {
  if (slug && auth.token) {
    fetchProfile();
  }
}, [slug, auth.token, fetchProfile]);


  if (!kidProfile) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <>
      <KidsNav />
      <Container className="kids-container my-4 py-4">
      {feedback.message && (
        <Alert variant={feedback.type} className="text-center">
          {feedback.message}
        </Alert>
      )}
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={onSubmit} className="form-profile p-4 rounded shadow">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control-custom"/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Saldo Atual</Form.Label>
              <Form.Control type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="form-control-custom"/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idade</Form.Label>
              <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control-custom"/>
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100 mt-3'>
              Atualizar Perfil
            </Button>
          </Form>
          <div className='mt-3 text-center'>
            <Button variant="secondary" className="mt-2" onClick={() => history.push(`/kids/${slug}/config`)}>
              Voltar para Configurações
            </Button>
          </div>
        </Col>
      </Row>
    </Container>

    </>
  );
};

export default KidProfile;
