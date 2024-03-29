import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import { fetchKidsProfiles } from '../apis'; 
import './KidsProfiles.css'; 
import './css/GlobalKids.css'; 

const KidsProfiles = () => {
  const [kidsProfiles, setKidsProfiles] = useState([]);
  const auth = useContext(AuthContext);
  const history = useHistory();

  // Função para buscar os perfis das crianças
  const onFetchKidsProfiles = useCallback(async () => {
    try {
      const json = await fetchKidsProfiles(auth.token);
      if (json) {
        setKidsProfiles(json);
      }
    } catch (error) {
      console.error('Erro ao buscar perfis das crianças:', error);
      // Adicione aqui qualquer tratamento de erro ou notificação ao usuário
    }
  }, [auth.token]);

  useEffect(() => {
    onFetchKidsProfiles();
  }, [onFetchKidsProfiles]);

  return (
    <>
      <Container className="kids-container kids-profiles">
      <Row className="justify-content-md-center">
            <Col xs={12}>
                <div className="welcome-message">
                    Oi tudo bem?
                </div>
                <div className="current-balance">
                    Veja seu perfil aqui!
                </div>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          {kidsProfiles.map((kidsProfile) => (
            <Col xs={12} md={4} lg={4} key={kidsProfile.slug} className="mb-3">
              <Card className='kids-profiles-card' onClick={() => history.push(`/kids/${kidsProfile.slug}`)}>
                <Card.Img variant="top" src={kidsProfile.image} className="kids-profile-card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title className="text-center">{kidsProfile.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default KidsProfiles;
