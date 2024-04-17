import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: '#F2F2F2', // Cor de fundo do botão.
    transform: 'scale(1.5)',
    transition: 'transform 0.3s ease-in-out, color 0.3s ease',
  },
  '&:active': {
    transform: 'scale(1.1)',
  },
  color: '#757575',
  marginTop: '10px',
}));

export function getColumns(handleDialogOpen) {
    return [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'ticker', headerName: 'Ticker', width: 130, editable: false },
        { field: 'shares_amount', headerName: 'Qnt', width: 130, editable: true },
        { field: 'share_average_price_brl', headerName: 'PM Brl', width: 130, editable: true },
        { field: 'share_average_price_usd', headerName: 'PM Usd', width: 130, editable: true },
        { field: 'category', headerName: 'Categoria', width: 180, editable: false },
        { field: 'broker', headerName: 'Broker', width: 130, editable: false },
        { field: 'delete', headerName: 'Delete', width: 130, renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CustomIconButton
                    onClick={() => handleDialogOpen(params.id)}
                    size="small"
                >
                    <DeleteIcon />
                </CustomIconButton>
            </div>
        )},        
    ];
}
