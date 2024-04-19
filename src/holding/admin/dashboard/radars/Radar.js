import React, { useEffect, useState, useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import AuthContext from '../../../../contexts/AuthContext';
import MainLayout from '../../../../layouts/MainLayout';
import { fetchRadarCategories } from '../../../../apis';

import RadarCategoriesGrid from './radarCategoriesGrid';
import RadarCategoriesChart from './radarCategoriesChart';

const Radar = () => {
    const [radarCategories, setRadarCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await fetchRadarCategories(params.id, auth.token);
            setRadarCategories(categories || []);
            setLoading(false);
        };
        fetchCategories();
    }, [params.id, auth.token]);

    return (
        <MainLayout>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                {loading ? <CircularProgress /> : (
                    <>
                        <Box sx={{ flex: 0.3, marginRight: 2, height: 'calc(100vh - 100px)' }}>
                            {/* Menu Lateral */}
                        </Box>
                        <Box sx={{ flex: 0.3, marginRight: 2, height: 'calc(100vh - 100px)' }}>
                            <RadarCategoriesGrid categories={radarCategories} authToken={auth.token} />
                        </Box>
                        <Box sx={{ flex: 0.4, height: 'calc(100vh - 100px)' }}>
                            <RadarCategoriesChart categories={radarCategories} />
                        </Box>
                    </>
                )}
            </Box>
        </MainLayout>
    );
};

export default Radar;
