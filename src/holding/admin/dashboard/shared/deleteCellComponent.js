// deleteCellComponent.js

import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: '#F2F2F2', // Light grey for hover background.
    transform: 'scale(1.5)',
    transition: 'transform 0.3s ease-in-out, color 0.3s ease',
  },
  '&:active': {
    transform: 'scale(1.1)',
  },
  color: '#757575', // Default color.
  marginTop: '10px',
}));

const DeleteCellComponent = ({ handleDialogOpen, id }) => (
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <CustomIconButton
      onClick={() => handleDialogOpen(id)}
      size="small"
    >
      <DeleteIcon />
    </CustomIconButton>
  </div>
);

export default DeleteCellComponent;
