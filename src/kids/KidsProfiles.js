import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import KidsNav from './KidsNav';
import { fetchKidsProfiles } from '../apis'; // Certifique-se de que o caminho está correto
import './KidsProfiles.css'; // Certifique-se de que o caminho está correto

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
      <KidsNav />
      <Container className="kids-dividends">
        <Row className="justify-content-md-center">
          {kidsProfiles.map((kidsProfile) => (
            <Col xs={12} md={4} lg={4} key={kidsProfile.slug} className="mb-3">
              <Card onClick={() => history.push(`/kids/${kidsProfile.slug}`)}>
                <Card.Img variant="top" src={kidsProfile.image} className="rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
