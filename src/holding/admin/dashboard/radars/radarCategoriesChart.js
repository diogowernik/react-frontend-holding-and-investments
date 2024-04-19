// RadarCategoriesChart.js - Mantenha este comentario

import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';

const RadarCategoriesChart = ({ categories }) => {
    const chartData = {
        labels: categories.map(cat => cat.category),
        datasets: [{
            label: '% Ideal',
            data: categories.map(cat => cat.ideal_category_percentage * 100),
            backgroundColor: [
                '#6B8E23', // Verde Escuro
                '#FFD700', // Dourado
                '#4169E1', // Azul Royal                
                '#50C878', // Verde Esmeralda
                // '#DAA520 ', // Amarelo Dourado 
                '#00CED1', // Azul Turquesa

            ],
            hoverBackgroundColor: [
                '#6B8E23', // Verde 
                '#FFD700', // Dourado
                '#4169E1', // Azul Royal
                '#50C878', // 
                '#00CED1', //
            ]
            
            

        }]
    };

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>Category Ideal Percentages</Typography>
            <Pie data={chartData} />
        </Box>
    );
};

export default RadarCategoriesChart;
