import { Col, Button } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.1);
  display: flex;
  opacity: ${({active}) => (active ? 1 : 0.6)};
  > div:first-child {
    width: 40%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-size: cover;
  }
  > div:last-child {
    padding: 15px 20px;
    min-height: 150px;
  }
`;

const RadarItem = ({ item, onEdit, onRemove }) => (
  <Container>
    
    <Col xs={12} className="d-flex flex-column justify-content-between w-100">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0">
            <b>{item.name}</b>
          </h4>
          <div>
            { onEdit ? (
              <Button variant="link" onClick={onEdit}>
                <BiEdit size={20} />
              </Button>
            ) : null }

            { onRemove ? (
              <Button variant="link" onClick={onRemove}>
                <AiOutlineDelete size={20} color="red" />
              </Button>
            ) : null }
          </div>
        </div>
        
      </div>
      <div className="d-flex justify-content-between align-items-end">
        

      </div>
    </Col>
  </Container>
);

export default RadarItem;