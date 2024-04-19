// portfolioAssetsColumns.js - ok
import React from 'react';
import DeleteCellComponent from '../shared/deleteCellComponent';

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
            <DeleteCellComponent handleDialogOpen={handleDialogOpen} id={params.id} />
        )},        
    ];
}

export default getColumns;
