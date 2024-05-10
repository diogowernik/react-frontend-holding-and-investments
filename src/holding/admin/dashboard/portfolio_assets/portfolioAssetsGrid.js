import React, { useCallback } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

import PorfolioAssetsColumns from './portfolioAssetsColumns';
import { updatePortfolioAsset, removePortfolioAsset } from '../../../../apis';
import { processRowUpdate, useDeleteAction } from '../shared';

const PortfolioAssetsGrid = ({ assets, setAssets, authToken }) => {
    const handleProcessRowUpdate = useCallback((newRow) => {
        const fieldsToUpdate = {
            shares_amount: true,
            share_average_price_brl: true,
            share_average_price_usd: true,
        };
        return processRowUpdate(newRow, updatePortfolioAsset, authToken, fieldsToUpdate);
    }, [authToken]);
    

    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction((id) => {
        removePortfolioAsset(id, authToken);
        setAssets((prev) => prev.filter(asset => asset.id !== id));
    });

    const columns = PorfolioAssetsColumns(handleDialogOpen);

    return (
        <>
            <DataGrid
                rows={assets}
                columns={columns}
                getRowId={(row) => row.id}
                processRowUpdate={handleProcessRowUpdate}
                sx={{ height: 700, [`& .${gridClasses.row}`]: { bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900] } }}
            />
            {renderDeleteDialog()}
        </>
    );
};

export default PortfolioAssetsGrid;
