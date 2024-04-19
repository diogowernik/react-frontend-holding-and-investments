import React, { useCallback } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { updateRadarCategory } from '../../../../apis';
import { processRowUpdate } from '../shared';
import { grey } from '@mui/material/colors';
import { getColumns } from './radarCategoriesColumns';
import { Box, Typography } from '@mui/material';

const RadarCategoriesGrid = ({ categories, authToken }) => {
    const handleProcessRowUpdate = useCallback((newRow) => {
        const fieldsToUpdate = {
            ideal_category_percentage: true,
        };
        return processRowUpdate(newRow, updateRadarCategory, authToken, fieldsToUpdate);
    }, [authToken]);
    
    

    const columns = getColumns();
    const totalPercentage = categories.reduce((sum, cat) => sum + (cat.ideal_category_percentage * 100), 0).toFixed(2);

    return (
        <>
            <DataGrid
                rows={categories}
                columns={columns}
                getRowId={(row) => row.radar_category_id}
                processRowUpdate={handleProcessRowUpdate}
                sx={{ height: 400, [`& .${gridClasses.row}`]: { bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900] } }}
            />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'left' }}>
                <Typography variant="subtitle1">
                    Total Percentage: {totalPercentage}%
                </Typography>
            </Box>
        </>
    );
};

export default RadarCategoriesGrid;
